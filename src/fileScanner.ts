import * as vscode from 'vscode';
import * as path from 'path';

export async function getAllRelativeFilePaths(currentFile: vscode.Uri): Promise<string[]> {
  const files = await vscode.workspace.findFiles('**/*', '**/{node_modules,.git,.next,out,dist,build}/**');
  const currentDir = path.dirname(currentFile.fsPath);

  return files
    .filter(file => file.fsPath !== currentFile.fsPath) // exclude self
    .map(file => {
      const relativePath = path.relative(currentDir, file.fsPath).replace(/\\/g, '/');
      return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
    });
}
