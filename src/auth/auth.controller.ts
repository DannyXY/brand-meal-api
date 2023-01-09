import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto, SigninDto } from "./dto";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signin(@Body() dto: SigninDto) {
    try {
      return this.authService.signin(dto);
    } catch (err) {
      throw err;
    }
  }

  @Post("signup")
  async signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
}
