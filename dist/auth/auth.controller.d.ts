import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signin(dto: AuthDto): Promise<any>;
    signup(dto: AuthDto): Promise<any>;
}
