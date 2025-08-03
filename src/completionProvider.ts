import * as vscode from 'vscode';
import { getAllRelativeFilePaths } from './fileScanner';

export function registerMentionCompletionProvider() {
  return vscode.languages.registerCompletionItemProvider(
    { scheme: 'file' }, // Trigger in all file types
    {
      async provideCompletionItems(document, position) {
        const line = document.lineAt(position).text;
        const triggerPos = line.lastIndexOf('@', position.character);
        if (triggerPos === -1) {
          return [];
        }

        const currentFile = document.uri;
        const allFiles = await getAllRelativeFilePaths(currentFile);

        return allFiles.map(file => {
          const item = new vscode.CompletionItem(`@${file}`, vscode.CompletionItemKind.File);
          item.insertText = `${file}`;
          item.detail = '@Mention: Referenced file';
          return item;
        });
      }
    },
    '@'
  );
}
