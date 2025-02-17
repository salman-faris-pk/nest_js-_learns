import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptionsWithoutRequest } from "passport-jwt";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    
    const secretOrKey = process.env.JWT_SECRET;
    if (!secretOrKey) {
      throw new Error("JWT_SECRET is not defined in the environment variables.");
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretOrKey,
    } as StrategyOptionsWithoutRequest);
  }

  async validate(payload: { username: string }) {
    const user = await this.prismaService.users.findUnique({
      where: { username: payload.username },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}