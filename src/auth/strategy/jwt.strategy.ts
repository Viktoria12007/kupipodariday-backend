import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from "../../users/users.service";
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService, private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('jwt.secret'),
        });
    }

    async validate(jwtPayload: { sub: number }) {
        const user = await this.usersService.findOne({ where: { id: jwtPayload.sub } });

        if (!user) {
            throw new UnauthorizedException('Такого пользователя не существует.');
        }

        return user;
    }
}
