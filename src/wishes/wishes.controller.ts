import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthUser } from "../common/decorators/user.decorator";
import { User } from "../users/entities/user.entity";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { Wish } from "./entities/wish.entity";

@ApiTags('wishes')
@ApiExtraModels(Wish)
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @ApiOperation({ summary: 'Создание подарка' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  create(@AuthUser() user: User, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(user.id, createWishDto);
  }

  @ApiOperation({ summary: 'Получить последние 40 подарков' })
  @Get('last')
  findLast() {
    return this.wishesService.findLast();
  }

  @ApiOperation({ summary: 'Получить 20 самых популярных подарков' })
  @Get('top')
  findTop() {
    return this.wishesService.findTop();
  }

  @ApiOperation({ summary: 'Получить подарок по id' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne({ where: { id: +id }});
  }

  @ApiOperation({ summary: 'Редактировать подарок по id' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.updateOne( { id: +id }, updateWishDto);
  }

  @ApiOperation({ summary: 'Удалить подарок по id' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishesService.removeOne({ id: +id });
  }

  @ApiOperation({ summary: 'Копировать подарок' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post(':id/copy')
  copy(@AuthUser() user: User, @Param('id') id: string) {
    return this.wishesService.copy(user.id, +id);
  }
}
