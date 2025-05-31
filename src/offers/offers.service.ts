import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { Offer } from "./entities/offer.entity";
import { UsersService } from "../users/users.service";
import { WishesService } from "../wishes/wishes.service";

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  async create(userId: number, createOfferDto: CreateOfferDto) {
    const { amount, itemId } = createOfferDto;
    const user = await this.usersService.findOne({ where: { id: userId }});
    const item = await this.wishesService.findOne({ where: { id: itemId }});

    const raised = item.raised + amount;
    if (raised > item.price) {
      throw new BadRequestException('Сумма заявки больше чем осталось собрать');
    }
    item.raised += amount;

    await this.wishesService.updateOne({ id: itemId }, { raised });

    return this.offerRepository.save({ ...createOfferDto, user, item });
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
