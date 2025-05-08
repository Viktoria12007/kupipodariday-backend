import { Body, Controller, Get, HttpCode, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtGuard } from "../auth/guards/jwt.guard";
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  OmitType
} from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { NoValidUserResponse } from "./dto/no-valid-user-response";
import { FindUserDto } from "./dto/find-user.dto";
import { AuthUser } from "../common/decorators/user.decorator";

@ApiBearerAuth()
@ApiTags('users')
@ApiExtraModels(User)
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    description: 'Возвращает пользователя по токену',
    status: 200,
    type: OmitType(User, ['password', 'email'])
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: NoValidUserResponse })
  @Get('me')
  profile(@AuthUser() user: User) {
    return this.usersService.findOne({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        email: true,
        username: true,
        about: true,
        avatar: true,
      }
    });
  }

  @Patch('me')
  async updateProfile(@AuthUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    const { password, ...updatedUser } = await this.usersService.updateOne({ where: { id: user.id }}, updateUserDto);
    return updatedUser;
  }

  @Get('me/wishes')
  async meWishes(@AuthUser() user: User) {
    const me = await this.usersService.findOne({ where: { id: user.id }});
    return me.wishes;
  }

  @ApiParam({
    name: 'username',
    description: 'Username of the user',
    example: 'Test user 1'
  })
  @Get(':username')
  findByUsername(@Param('username') username: string ) {
    return this.usersService.findOne({ where: { username } });
  }

  @Get(':username/wishes')
  async findWishesByUsername(@Param('username') username: string ) {
    const user = await this.usersService.findOne({ where: { username } });
    return user.wishes;
  }

  @Post('find')
  @HttpCode(200)
  findByUsernameOrEmail(@Body() findUserDto: FindUserDto) {
    const { email, username } = findUserDto;
    return this.usersService.findMany({ where: [{ username }, { email }] });
  }
}
