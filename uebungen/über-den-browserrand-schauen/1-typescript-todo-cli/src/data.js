export const todos = [
	{ id: 1, title: "TypeScript lernen", description: "Die Basics von TypeScript verstehen", status: "pending" },
	{ id: 2, title: "Übung abschließen", description: "Die Todo-CLI auf TypeScript migrieren", status: "pending" },
	{ id: 3, title: "Projekt einrichten", description: "Node.js und npm installieren", status: "completed" },
];

export let nextId = 4;

export function incrementNextId() {
	return nextId++;
}
