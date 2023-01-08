import { BaseModel } from "./base.model";
export declare class UserModel extends BaseModel {
    static tableName: string;
    email: string;
    password: string;
    role: string;
}
