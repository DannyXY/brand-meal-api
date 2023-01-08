import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { ModelClass } from "objection";
import { UserModel } from "src/database/models/user.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private config: ConfigService,
    @Inject("UserModel") private modelClass: ModelClass<UserModel>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("JWT_SECRET"),
    });
  }
  validate(payload: { sub: number; email: string; iat: number }) {
    return this.modelClass
      .query()
      .where({ email: payload.email })
      .returning("*")
      .first();
  }
}
