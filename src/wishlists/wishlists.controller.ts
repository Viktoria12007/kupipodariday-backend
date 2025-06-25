import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthUser } from "../common/decorators/user.decorator";
import { User } from "../users/entities/user.entity";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { Wishlist } from "./entities/wishlist.entity";

@ApiTags('wishlistlists')
@ApiBearerAuth()
@ApiExtraModels(Wishlist)
@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @ApiOperation({ summary: 'Создать список подарков' })
  @Post()
  create(@AuthUser() user: User, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.create(user.id, createWishlistDto);
  }

  @ApiOperation({ summary: 'Найти все списки подарков' })
  @Get()
  findAll() {
    return this.wishlistsService.findMany();
  }

  @ApiOperation({ summary: 'Получить список подарков по id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistsService.findOne({ where: { id: +id }});
  }

  @ApiOperation({ summary: 'Редактировать список подарков по id' })
  @Patch(':id')
  update(@AuthUser() user: User, @Param('id') id: string, @Body() updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistsService.updateOne(user.id, { id: +id }, updateWishlistDto);
  }

  @ApiOperation({ summary: 'Удалить список подарков по id' })
  @Delete(':id')
  remove(@AuthUser() user: User, @Param('id') id: string) {
    return this.wishlistsService.removeOne(user.id, { id: +id });
  }
}
