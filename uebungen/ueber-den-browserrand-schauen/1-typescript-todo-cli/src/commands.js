import { getTodos, createTodo, markTodoAsCompleted, removeTodo } from "./todo-service.js";

export function handleList(filter) {
	return getTodos(filter);
}

export function handleAdd(title, description) {
	if (!title) {
		throw new Error("Titel fehlt");
	}
	return createTodo(title, description || "");
}

export function handleComplete(id) {
	if (!id) {
		throw new Error("ID fehlt");
	}
	return markTodoAsCompleted(id);
}

export function handleDelete(id) {
	if (!id) {
		throw new Error("ID fehlt");
	}
	return removeTodo(id);
}
