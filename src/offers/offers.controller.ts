import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthUser } from "../common/decorators/user.decorator";
import { User } from "../users/entities/user.entity";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { Offer } from "./entities/offer.entity";

@ApiTags('offers')
@ApiBearerAuth()
@ApiExtraModels(Offer)
@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @ApiOperation({ summary: 'Создание предложения скинуться' })
  @Post()
  create(@AuthUser() user: User, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(user.id, createOfferDto);
  }

  @ApiOperation({ summary: 'Получить все предложения скинуться' })
  @Get()
  findAll() {
    return this.offersService.findMany();
  }

  @ApiOperation({ summary: 'Получить предложение скинуться по id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne({ where: { id: +id }});
  }
}
