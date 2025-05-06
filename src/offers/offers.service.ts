import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { Offer } from "./entities/offer.entity";

@Injectable()
export class OffersService {
  constructor(@InjectRepository(Offer) private offerRepository: Repository<Offer>) {}

  async create(createOfferDto: CreateOfferDto) {
    const offer = await this.offerRepository.create(createOfferDto);
    return this.offerRepository.save(offer);
  }

  findMany(query?: FindManyOptions<Offer>) {
    return this.offerRepository.find(query);
  }

  findOne(query: FindOneOptions<Offer>) {
    return this.offerRepository.findOneOrFail(query);
  }

  // updateOne(id: number, updateOfferDto: UpdateOfferDto) {
  //   return this.offerRepository.update({ id }, updateOfferDto);
  // }
  //
  // removeOne(id: number) {
  //   return this.offerRepository.delete({ id });
  // }
}
