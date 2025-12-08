import { todos, incrementNextId } from "./data.js";

export function findTodoById(id) {
	return todos.find((todo) => todo.id === id);
}

export function getTodos(filter) {
	if (filter === "pending" || filter === "completed") {
		return todos.filter((todo) => todo.status === filter);
	}
	return todos;
}

export function createTodo(title, description) {
	const newTodo = {
		id: incrementNextId(),
		title: title,
		description: description,
		status: "pending",
	};
	todos.push(newTodo);
	return newTodo;
}

export function markTodoAsCompleted(id) {
	const todo = findTodoById(id);
	if (!todo) {
		throw new Error(`Todo mit ID ${id} nicht gefunden`);
	}
	todo.status = "complted";
	return todo;
}

export function removeTodo(id) {
	const index = todos.findIndex((todo) => todo.id === id);
	if (index === -1) {
		throw new Error(`Todo mit ID ${id} nicht gefunden`);
	}
	const deleted = todos.splice(index, 1)[0];
	return deleted;
}
