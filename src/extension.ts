import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  
	let disposable = vscode.commands.registerCommand('extension.runNodeApp', () => {

    function logError(message: string){
      vscode.window.showErrorMessage(message);
    }
    
    let activeTextEditor = vscode.window.activeTextEditor;
    let documentUri = activeTextEditor?.document.uri;
    let terminalUri: string;
    if(documentUri?.scheme === "file"){
      terminalUri = documentUri.fsPath.substr(0, documentUri.fsPath.lastIndexOf("/"));
    }else{
      logError("Remote file aren't compatible yet");
      return;
    }
    
    function generateTerminal(){
      let terminals = vscode.window.terminals;
      for(let t of terminals){
        if(t.name === "Javascript"){
          return t;
        }
      }
      return vscode.window.createTerminal({
        "name": "Javascript",
        "cwd": terminalUri
      });
    }
    
    let terminal = generateTerminal();
    terminal.show(true);
    terminal.sendText(`node ${documentUri?.fsPath}`, true);
	});

	context.subscriptions.push(disposable);
}




// this method is called when your extension is deactivated
export function deactivate() {}
