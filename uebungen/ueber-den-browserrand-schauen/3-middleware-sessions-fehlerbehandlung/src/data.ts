import type { Todo } from "./types.js";

export const todos: Todo[] = [
	{ id: 1, title: "TypeScript lernen", description: "Die Basics von TypeScript verstehen", status: "pending" },
	{ id: 2, title: "Übung abschließen", description: "Die Todo-CLI auf TypeScript migrieren", status: "pending" },
	{ id: 3, title: "Projekt einrichten", description: "Node.js und npm installieren", status: "completed" },
];

export let nextId = 4;

export function incrementNextId(): number {
	return nextId++;
}
