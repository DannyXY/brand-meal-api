import { ConfigService } from "@nestjs/config";
import { ModelClass } from "objection";
import { UserModel } from "src/database/models/user.model";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private config;
    private modelClass;
    constructor(config: ConfigService, modelClass: ModelClass<UserModel>);
    validate(payload: {
        sub: number;
        email: string;
        iat: number;
    }): import("objection").QueryBuilderYieldingOneOrNone<UserModel>;
}
export {};
