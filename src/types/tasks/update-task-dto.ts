import { StatusEnum } from "./task-enum";

export interface UpdateTaskDto {
    name?: string;
    status?: StatusEnum;
}