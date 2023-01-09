import { Injectable, ForbiddenException, Inject } from "@nestjs/common";
import { AuthDto, SigninDto } from "./dto/auth.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ModelClass } from "objection";
import { UserModel } from "src/database/models/user.model";

@Injectable()
export class AuthService {
  constructor(
    @Inject("UserModel") private modelClass: ModelClass<UserModel>,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async signup(dto: AuthDto): Promise<any> {
    //Check if user
    const user = await this.modelClass
      .query()
      .where({ email: dto.email })
      .returning("*")
      .first();
    //if user throw exception
    if (user) throw new ForbiddenException("User with email already exists");
    //if user, hash passwrd
    const salt = 10;
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    return this.modelClass
      .query()
      .insert({ email: dto.email, password: hashedPassword, role: dto.role });
  }

  async signin(dto: SigninDto): Promise<any> {
    const user = await this.modelClass
      .query()
      .where({ email: dto.email })
      .returning("*")
      .first();
    if (!user) throw new ForbiddenException("Credentials Incorrect");
    const pwMatch: boolean = await bcrypt.compare(dto.password, user.password);
    if (!pwMatch) throw new ForbiddenException("Credentials Incorrect");
    const token = await this.signToken(user.id, user.email);
    return {
      success: true,
      token,
    };
  }
  //sign token
  async signToken(userID: number, email: string): Promise<string> {
    const payload = {
      sub: userID,
      email,
    };
    return this.jwt.signAsync(payload, {
      secret: this.config.get("JWT_SECRET"),
    });
  }
}
