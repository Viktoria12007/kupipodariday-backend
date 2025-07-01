import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
    const item = await this.wishesService.findOne({ where: { id: itemId }, relations: { owner: true }});

    if (userId === item.owner.id) {
      throw new BadRequestException('Нельзя вносить деньги на собственные подарки');
    }

    const raised = item.raised + amount;
    if (raised > item.price) {
      throw new BadRequestException('Сумма заявки больше чем осталось собрать');
    }
    item.raised += amount;

    await this.wishesService.set({ id: itemId }, { raised });

    return this.offerRepository.save({ ...createOfferDto, user, item });
  }

  findMany(query?: FindManyOptions<Offer>) {
    return this.offerRepository.find(query);
  }

  findOne(query: FindOneOptions<Offer>) {
    const offer = this.offerRepository.findOne(query);
    if (!offer) {
      throw new NotFoundException('Такого предложения скинуться не существует!');
    }
    return offer;
  }
}
