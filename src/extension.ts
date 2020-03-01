import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  //---------------------------------------------------------------------------------------------
  //                                      RUN NPM START
  //---------------------------------------------------------------------------------------------
  let npmStart = vscode.commands.registerCommand('extension.runNpmStart', () => {
    let terminalUri = _detectBasePath(vscode.window.activeTextEditor);
    if(terminalUri === undefined){
      _logError("An error occurred");
      return;
    }

    let terminal = _generateTerminal(terminalUri, "NPM start");
    terminal.show(true);
    terminal.sendText(`npm start`, true);
  });//End of runNpmStart
  
  //---------------------------------------------------------------------------------------------
  //                                      RUN NODE APP
  //---------------------------------------------------------------------------------------------
	let nodeApp = vscode.commands.registerCommand('extension.runNodeApp', () => {
    let terminalUri = _detectBasePath(vscode.window.activeTextEditor);
    if(terminalUri === undefined){
      _logError("An error occurred");
      return;
    }
    let documentUri = vscode.window.activeTextEditor?.document.uri;
    let terminal = _generateTerminal(terminalUri, "Javascript");
    terminal.show(true);
    terminal.sendText(`node ${documentUri?.fsPath}`, true);
	});//End of runNodeApp


  //---------------------------------------------------------------------------------------------
  //                                      PUSHING FUNCTIONS
  //---------------------------------------------------------------------------------------------
  context.subscriptions.push(npmStart);
  context.subscriptions.push(nodeApp);

  //---------------------------------------------------------------------------------------------
  //                                      UTILITY FUNCTIONS
  //---------------------------------------------------------------------------------------------

  function _logError(message: string){
    vscode.window.showErrorMessage(message);
  }

  function _generateTerminal(cwd: string, terminalName: string){
    let terminals = vscode.window.terminals;
    for(let t of terminals){
      if(t.name === terminalName){
        return t;
      }
    }
    return vscode.window.createTerminal({
      "name": terminalName,
      "cwd": cwd
    });
  }

  function _detectBasePath(activeTextEditor: vscode.TextEditor | undefined): string | undefined{
    let documentUri = activeTextEditor?.document.uri;
    if(documentUri?.scheme === "file"){
      return documentUri.fsPath.substr(0, documentUri.fsPath.lastIndexOf("/"));
    }else{
      _logError("Remote file aren't compatible yet");
      return;
    }
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
