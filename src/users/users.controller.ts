import { Body, Controller, Get, HttpCode, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtGuard } from "../guards/jwt.guard";
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

@ApiBearerAuth()
@ApiTags('users')
@ApiExtraModels(User)
@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    description: 'Возвращает пользователя по токену',
    status: 200,
    type: OmitType(User, ['password', 'email'])
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: NoValidUserResponse })
  @Get('me')
  profile(@Req() req) {
    return this.usersService.findOne({ where: { id: req.user.id }});
  }

  @Patch('me')
  async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const { password, ...user} = await this.usersService.updateOne({ where: { id: req.user.id }}, updateUserDto);
    return user;
  }

  @Get('me/wishes')
  async meWishes(@Req() req) {
    const me = await this.usersService.findOne({ where: { id: req.user.id }});
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
