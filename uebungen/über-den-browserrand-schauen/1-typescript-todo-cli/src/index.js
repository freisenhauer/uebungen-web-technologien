import { handleList, handleAdd, handleComplete, handleDelete } from "./commands.js";
import { showHelp, showSuccess, showError, displayTodos } from "./ui.js";

function main() {
	const args = process.argv.slice(2);
	const command = args[0];

	try {
		switch (command) {
			case "list": {
				const filter = args[1];
				const todos = handleList(filter);
				displayTodos(todos);
				break;
			}
			case "add": {
				const title = args[1];
				const description = args[2];
				const newTodo = handleAdd(title, description);
				showSuccess(`Todo "${newTodo.title}" wurde hinzugefügt (ID: ${newTodo.id})`);
				break;
			}
			case "complete": {
				const id = args[1];
				const todo = handleComplete(id);
				showSuccess(`Todo "${todo.title}" wurde als erledigt markiert`);
				break;
			}
			case "delete": {
				const id = args[1];
				const deleted = handleDelete(id);
				showSuccess(`Todo "${deleted.title}" wurde gelöscht`);
				break;
			}
			default:
				showHelp();
		}
	} catch (error) {
		showError(error.message);
	}
}

main();
