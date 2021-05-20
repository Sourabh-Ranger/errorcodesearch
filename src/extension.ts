// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HelloWorldPanel } from './HelloWorldPanel';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {	
		context.subscriptions.push(
			vscode.commands.registerCommand('errorcodesearch.Stackerrorsearch', () => {
			// getting a list of problems
			let diagnostics: [vscode.Uri, vscode.Diagnostic[]][] = vscode.languages.getDiagnostics();
	
			// formation of the error selection list
			let errorMessages: string[] = [];
			diagnostics.forEach((value) => {
				value[1].forEach((value) => {
					let error: string = value.message;
					if (value.source !== undefined) {
						error += ' ' + value.source;
					}
					errorMessages.push(error);
				});
			});
	
			// show the selection window
			vscode.window.showQuickPick(errorMessages)
				// process the response
				.then((value) => {
					if(value !== undefined)
						{openBrowser(value);}
				});
			})
		);

	console.log('Congratulations, your extension "errorcodesearch" is now active!');

	context.subscriptions.push(
		vscode.commands.registerCommand('errorcodesearch.helloWorld', () => {
			HelloWorldPanel.createOrShow(context.extensionUri);
	}));


	context.subscriptions.push(
		vscode.commands.registerCommand("errorcodesearch.askQuestion", async () => {
		const answer = await vscode.window.showInformationMessage(
			"How are your day?",
			"good", 
			"bad"
			);
		if (answer ==="bad"){
			console.log({answer});
			vscode.window.showInformationMessage('sorry to hear that try to do your best');
		} else {
			console.log({answer});
		}	
	}));
	
}

// this method is called when your extension is deactivated
export function deactivate() {}

function openBrowser(str: string) {
	let searchQuery = "https://www.google.com/search?q=" + encodeURI(str.replace(/["'\-\\\/\.\,\|\(\)\[\]\~\`\^\:\#\;\%]/gm, '') + ' site:stackoverflow.com');
	vscode.env.openExternal(vscode.Uri.parse(searchQuery));
}