import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Offer } from "./entities/offer.entity";
import { UsersModule } from "../users/users.module";
import { WishesModule } from "../wishes/wishes.module";

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), UsersModule, WishesModule],
  controllers: [OffersController],
  providers: [OffersService],
  exports: [OffersService]
})
export class OffersModule {}
