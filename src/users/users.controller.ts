import { Body, Controller, Get, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtGuard } from "../auth/guards/jwt.guard";
import {
  ApiBearerAuth,
  ApiExtraModels, ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  OmitType
} from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { NoValidUserResponse } from "./dto/no-valid-user-response";
import { AuthUser } from "../common/decorators/user.decorator";

@ApiTags('users')
@ApiBearerAuth()
@ApiExtraModels(User)
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получить профиль' })
  @ApiResponse({
    description: 'Возвращает пользователя по токену',
    status: HttpStatus.OK,
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

  @ApiOperation({ summary: 'Редактировать профиль' })
  @Patch('me')
  async updateProfile(@AuthUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    const { password, ...updatedUser } = await this.usersService.updateOne({ where: { id: user.id }}, updateUserDto);
    return updatedUser;
  }

  @ApiOperation({ summary: 'Получить подарки пользователя' })
  @Get('me/wishes')
  async meWishes(@AuthUser() user: User) {
    const me = await this.usersService.findOne({ where: { id: user.id }, relations: { wishes: true } });
    return me.wishes;
  }

  @ApiOperation({ summary: 'Получить пользователя по username' })
  @Get(':username')
  findByUsername(@Param('username') username: string ) {
    return this.usersService.findOne({ where: { username } });
  }

  @ApiOperation({ summary: 'Получить все подарки пользователя по username' })
  @Get(':username/wishes')
  async findWishesByUsername(@Param('username') username: string ) {
    const user = await this.usersService.findOne({ where: { username }, relations: { wishes: true } });
    return user.wishes;
  }

  @ApiOperation({ summary: 'Получить пользователей по username или email' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Возвращает пользователей по email или username',
    type: [User],
  })
  @Post('find')
  findByUsernameOrEmail(@Body() queryObj: { query: string }) {
    return this.usersService.findMany({ where: [{ username: queryObj.query }, { email: queryObj.query }] });
  }
}
