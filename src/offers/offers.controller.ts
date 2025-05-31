import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { ApiTags } from "@nestjs/swagger";
import { AuthUser } from "../common/decorators/user.decorator";
import { User } from "../users/entities/user.entity";
import { JwtGuard } from "../auth/guards/jwt.guard";

@ApiTags('offers')
@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto);
  }

  @Get()
  findAll() {
    return this.offersService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne({ where: { id: +id }});
  }
}
