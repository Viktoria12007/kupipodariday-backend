import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtGuard } from "../guards/jwt.guard";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  profile(@Req() req) {
    return this.usersService.findOne(req.user.id);
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne(req.user.id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('me/wishes')
  async meWishes(@Req() req) {
    const me = await this.usersService.findOne(req.user.id);
    return me.wishes;
  }

  @Get(':username')
  findByUsername(@Param('username') username: string ) {
    return this.usersService.findOne({ username });
  }

  @Get(':username/wishes')
  async findWishesByUsername(@Param('username') username: string ) {
    const user = await this.usersService.findOne({ username });
    return user.wishes;
  }

  @Post('find')
  findByUsernameOrEmail(@Body() body: { query: string }) {
    return this.usersService.findByUsernameOrEmail(body.query);
  }
}
