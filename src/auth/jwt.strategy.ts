import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { UsersService } from "../users/users.service";
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService, private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.configService.get<string>('jwt_secret'),
        });
    }

    async validate(jwtPayload: { sub: number }) {
        const user = this.usersService.findOne(jwtPayload.sub);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
