export interface Task {
    id?: string;
    name: string;
    description?: string;
    status?: number;
    deadline?: Date;
    projectId?: string;
}
