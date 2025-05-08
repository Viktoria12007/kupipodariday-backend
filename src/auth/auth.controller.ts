import {Body, Controller, Post, Req, UseGuards} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SigninUserDto } from "./dto/signin-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthUser } from "../common/decorators/user.decorator";

@ApiTags('authenticate')
@Controller()
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @UseGuards(LocalGuard)
    @Post('signin')
    signin(@AuthUser() user, @Body() signinUserDto: SigninUserDto) {
        return this.authService.auth(user);
    }

    @ApiOperation({ summary: 'Создание пользователя' })
    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        return this.authService.auth(user);
    }
}
