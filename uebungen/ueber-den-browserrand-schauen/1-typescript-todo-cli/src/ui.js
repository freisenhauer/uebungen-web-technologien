export function displayTodos(todos) {
	if (todos.length === 0) {
		console.log("Keine Todos gefunden.");
		return;
	}

	console.log("\n=== Deine Todos ===");
	for (const todo of todos) {
		const statusSymbol = todo.status === "completed" ? "✓" : "○";
		console.log(`[${todo.id}] ${statusSymbol} ${todo.title}`);
		console.log(`    ${todo.description}`);
	}
	console.log("");
}

export function showSuccess(message) {
	console.log(`✓ ${message}`);
}

export function showError(message) {
	console.log(`✗ ${message}`);
}

export function showHelp() {
	console.log("Verfügbare Befehle:");
	console.log("  list [pending|completed] - Todos auflisten");
	console.log('  add "Titel" "Beschreibung" - Neues Todo hinzufügen');
	console.log("  complete <ID>            - Todo als erledigt markieren");
	console.log("  delete <ID>              - Todo löschen");
}
