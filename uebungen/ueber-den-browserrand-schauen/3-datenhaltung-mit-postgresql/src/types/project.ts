import type { Task } from "./task.js";

export interface Project {
	id: number;
	name: string;
	ownerId: number;
}

export interface ProjectWithTasks extends Project {
	tasks: Task[];
}
