export type TodoStatus = "pending" | "completed";

export interface Todo {
	id: number;
	title: string;
	description: string;
	status: TodoStatus;
}
