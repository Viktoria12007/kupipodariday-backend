import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { ApiTags } from "@nestjs/swagger";
import { AuthUser } from "../common/decorators/user.decorator";

@ApiTags('wishes')
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(@AuthUser() user, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(user.id, createWishDto);
  }

  @Get('last')
  findLast() {
    return this.wishesService.findLast();
  }

  @Get('top')
  findTop() {
    return this.wishesService.findTop();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne({ where: { id: +id }});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.updateOne( { id: +id }, updateWishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishesService.removeOne({ id: +id });
  }

  // @Post(':id/copy')
  // copy(@Param('id') id: string) {
  //   return this.wishesService.copy(+id);
  // }
}
