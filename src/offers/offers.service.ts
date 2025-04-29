import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Offer } from "./entities/offer.entity";

@Injectable()
export class OffersService {
  constructor(@InjectRepository(Offer) private offerRepository: Repository<Offer>) {}

  create(createOfferDto: CreateOfferDto) {
    return this.offerRepository.save(createOfferDto);
  }

  // findMany(updateOfferDto: UpdateOfferDto) {
  //   return this.offerRepository.findBy(updateOfferDto);
  // }

  findOne(id: number) {
    return this.offerRepository.findOne({ where: { id } });
  }

  findAll() {
    return this.offerRepository.find();
  }

  // updateOne(id: number, updateOfferDto: UpdateOfferDto) {
  //   return this.offerRepository.update({ id }, updateOfferDto);
  // }
  //
  // removeOne(id: number) {
  //   return this.offerRepository.delete({ id });
  // }
}
