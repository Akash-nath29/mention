import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { registerMentionCompletionProvider } from './completionProvider';

class MentionDocumentLinkProvider implements vscode.DocumentLinkProvider {
  public provideDocumentLinks(
    document: vscode.TextDocument
  ): vscode.DocumentLink[] | undefined {
    const links: vscode.DocumentLink[] = [];
    const text = document.getText();
    const regex = /@(\S+)/g;
    
    let match;
    while ((match = regex.exec(text))) {
      const filename = match[1];
      const startPos = document.positionAt(match.index);
      const endPos = document.positionAt(match.index + match[0].length);
      const range = new vscode.Range(startPos, endPos);
      
      // Create the target URI by resolving relative to the current document
      const currentDir = path.dirname(document.uri.fsPath);
      const targetPath = path.resolve(currentDir, filename);
      
      // Only create link if the file actually exists
      if (fs.existsSync(targetPath)) {
        const targetUri = vscode.Uri.file(targetPath);
        const link = new vscode.DocumentLink(range, targetUri);
        link.tooltip = `Open ${filename}`;
        links.push(link);
      }
    }
    
    return links;
  }
}

// Helper function to generate file preview for hover
function generateFilePreview(filePath: string): vscode.MarkdownString {
  try {
    const stats = fs.statSync(filePath);
    const fileName = path.basename(filePath);
    const fileSize = (stats.size / 1024).toFixed(1);
    const relativePath = vscode.workspace.asRelativePath(filePath);
    
    // Read file content (limit to first 15 lines for preview)
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').slice(0, 15);
    const hasMore = content.split('\n').length > 15;
    
    // Detect file language for syntax highlighting
    const ext = path.extname(filePath).toLowerCase();
    const languageMap: { [key: string]: string } = {
      '.ts': 'typescript',
      '.js': 'javascript',
      '.tsx': 'tsx',
      '.jsx': 'jsx',
      '.py': 'python',
      '.json': 'json',
      '.md': 'markdown',
      '.html': 'html',
      '.css': 'css',
      '.scss': 'scss',
      '.yaml': 'yaml',
      '.yml': 'yaml',
      '.xml': 'xml',
      '.sql': 'sql',
      '.sh': 'bash',
      '.ps1': 'powershell'
    };
    
    const language = languageMap[ext] || 'text';
    
    // Build preview content
    const previewLines = lines.map((line, index) => {
      const lineNum = (index + 1).toString().padStart(2, ' ');
      return `${lineNum} │ ${line}`;
    }).join('\n');
    
    const markdown = new vscode.MarkdownString();
    markdown.isTrusted = true;
    
    // File header with metadata
    markdown.appendMarkdown(`**📄 ${fileName}**\n\n`);
    markdown.appendMarkdown(`*${relativePath}* • ${fileSize} KB • ${stats.mtime.toLocaleDateString()}\n\n`);
    
    // Code preview with syntax highlighting
    if (lines.length > 0) {
      markdown.appendMarkdown('**Preview:**\n');
      markdown.appendCodeblock(previewLines, language);
      
      if (hasMore) {
        markdown.appendMarkdown(`\n*... and ${content.split('\n').length - 15} more lines*\n`);
      }
    }
    
    // Action buttons
    markdown.appendMarkdown(`\n---\n`);
    markdown.appendMarkdown(`[📂 Open File](command:extension.openMentionFile?${encodeURIComponent(JSON.stringify({ fromPath: vscode.window.activeTextEditor?.document.uri.fsPath || '', filename: path.basename(filePath) }))}) • `);
    markdown.appendMarkdown(`[📋 Copy Path](command:extension.copyFilePath?${encodeURIComponent(JSON.stringify({ path: relativePath }))})`);
    
    return markdown;
    
  } catch (error) {
    // Fallback for files that can't be read
    const markdown = new vscode.MarkdownString();
    markdown.isTrusted = true;
    markdown.appendMarkdown(`**📄 ${path.basename(filePath)}**\n\n`);
    markdown.appendMarkdown(`*${vscode.workspace.asRelativePath(filePath)}*\n\n`);
    markdown.appendMarkdown(`⚠️ Unable to preview this file\n\n`);
    markdown.appendMarkdown(`[📂 Open File](command:extension.openMentionFile?${encodeURIComponent(JSON.stringify({ fromPath: vscode.window.activeTextEditor?.document.uri.fsPath || '', filename: path.basename(filePath) }))}) • `);
    
    return markdown;
  }
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(registerMentionCompletionProvider());

  // Register document link provider for clickable @filename mentions
  context.subscriptions.push(
    vscode.languages.registerDocumentLinkProvider(
      { scheme: 'file' },
      new MentionDocumentLinkProvider()
    )
  );

  const mentionDecoration = vscode.window.createTextEditorDecorationType({
    color: '#4FC3F7',
    textDecoration: 'underline',
  });

  function updateDecorations(editor: vscode.TextEditor | undefined) {
    if (!editor) {
      return;
    }

    const regex = /@(\S+)/g;
    const text = editor.document.getText();
    const decorations: vscode.DecorationOptions[] = [];

    let match;
    while ((match = regex.exec(text))) {
      const filename = match[1];
      const startPos = editor.document.positionAt(match.index);
      const endPos = editor.document.positionAt(match.index + match[0].length);

      // Only create decoration if the file actually exists
      const currentDir = path.dirname(editor.document.uri.fsPath);
      const targetPath = path.resolve(currentDir, filename);
      
      if (fs.existsSync(targetPath)) {
        decorations.push({
          range: new vscode.Range(startPos, endPos),
          hoverMessage: generateFilePreview(targetPath),
        });
      }
    }

    editor.setDecorations(mentionDecoration, decorations);
  }

  if (vscode.window.activeTextEditor) {
    updateDecorations(vscode.window.activeTextEditor);
  }

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateDecorations),
    vscode.workspace.onDidChangeTextDocument(event => {
      const editor = vscode.window.activeTextEditor;
      if (editor && event.document === editor.document) {
        updateDecorations(editor);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.openMentionFile', async (args) => {
      if (!args?.fromPath || !args?.filename) {
        return;
      }
      const fullPath = path.resolve(path.dirname(args.fromPath), args.filename);
      const fileUri = vscode.Uri.file(fullPath);

      try {
        const doc = await vscode.workspace.openTextDocument(fileUri);
        await vscode.window.showTextDocument(doc);
      } catch (err) {
        vscode.window.showErrorMessage(`Could not open: ${args.filename}`);
      }
    })
  );

  // Add copy file path command
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.copyFilePath', async (args) => {
      if (!args?.path) {
        return;
      }
      await vscode.env.clipboard.writeText(args.path);
      vscode.window.showInformationMessage(`Copied path: ${args.path}`);
    })
  );
}

export function deactivate() {}
