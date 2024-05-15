import { Types } from "mongoose";


export interface UserDto {
    _id: Types.ObjectId;
    __v?: number;
    username: string;
    password: string,
    created_at: Date;
  }