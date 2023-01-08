import { AuthDto } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ModelClass } from "objection";
import { UserModel } from "src/database/models/user.model";
export declare class AuthService {
    private modelClass;
    private jwt;
    private config;
    constructor(modelClass: ModelClass<UserModel>, jwt: JwtService, config: ConfigService);
    signup(dto: AuthDto): Promise<any>;
    signin(dto: AuthDto): Promise<any>;
    signToken(userID: number, email: string): Promise<string>;
}
