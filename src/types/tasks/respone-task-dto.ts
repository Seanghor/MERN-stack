import { Types } from "mongoose";
// import { StatusEnum } from "./task-enum";

export interface TaskDto {
    _id: Types.ObjectId;
    __v?: number;
    name: string;
    user_id: string;
    status: string,
    created_at: Date;
  }