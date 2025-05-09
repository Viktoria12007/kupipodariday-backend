import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { verifyHash } from "../helpers/hash";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private usersService: UsersService) {}

    auth(user: User) {
        const payload = { sub: user.id };

        return { access_token: this.jwtService.sign(payload) };
    }

    async validatePassword(username: string, password: string) {
        const user = await this.usersService.findOne({
            where: { username },
            select: {
                id: true,
                username: true,
                password: true,
            }
        });

        if (user && (await verifyHash(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }
}
