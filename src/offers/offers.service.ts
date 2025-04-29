import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
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

  findOne(query: FindOneOptions<Offer>) {
    return this.offerRepository.findOne(query);
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
