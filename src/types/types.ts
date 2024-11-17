export type Task = {
    id: string;
    title: string;
    description: string;
    date: string;
    completed: boolean | string;
    deadline: string;
    location: string;
    assignee: string;
}

export type FilterModel = {
    byCompleted: boolean
}

export interface TaskManagerInterface {
    init: () => void;
    update: (e: Event) => void;
    delete: (e: Event) => void;
    filter: (e: Event) => void;
}

export interface StorageManagerInterface {
    get: () => Task[];
    set: (taks: Task) => void;
    update: (tasks: Task[]) => void;
}