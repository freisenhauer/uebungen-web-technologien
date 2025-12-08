import type { Todo, TodoStatus } from "./types.js";
import { todos, incrementNextId } from "./data.js";

export function findTodoById(id: number): Todo | undefined {
	return todos.find((todo) => todo.id === id);
}

export function getTodos(filter?: TodoStatus): Todo[] {
	if (filter === "pending" || filter === "completed") {
		return todos.filter((todo) => todo.status === filter);
	}
	return todos;
}

export function createTodo(title: string, description: string): Todo {
	const newTodo: Todo = {
		id: incrementNextId(),
		title: title,
		description: description,
		status: "pending",
	};
	todos.push(newTodo);
	return newTodo;
}

export function markTodoAsCompleted(id: number): Todo {
	const todo = findTodoById(id);
	if (!todo) {
		throw new Error(`Todo mit ID ${id} nicht gefunden`);
	}
	todo.status = "completed";
	return todo;
}

export function removeTodo(id: number): Todo {
	const index = todos.findIndex((todo) => todo.id === id);
	if (index === -1) {
		throw new Error(`Todo mit ID ${id} nicht gefunden`);
	}
	const deleted = todos.splice(index, 1)[0];
	return deleted;
}
