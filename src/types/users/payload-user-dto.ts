import { Types } from "mongoose";

export interface PayloadDto {
    id: string |Types.ObjectId;
    username: string
}
