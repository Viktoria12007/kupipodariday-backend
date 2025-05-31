import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { Wish } from "./entities/wish.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
    private readonly usersService: UsersService
  ) {}

  async create(userId: number, createWishDto: CreateWishDto) {
    const owner = await this.usersService.findOne({ where: { id: userId }});
    return this.wishRepository.save({ ...createWishDto, owner });
  }

  findMany(query?: FindManyOptions<Wish>) {
    return this.wishRepository.find(query);
  }

  findOne(query: FindOneOptions<Wish>) {
    return this.wishRepository.findOneOrFail(query);
  }

  findLast() {
    return this.findMany({
      order: { createdAt: "DESC"},
      take: 40,
    })
  }

  findTop() {
    return this.findMany({
      order: { copied: "DESC" },
      take: 20,
    })
  }

  updateOne(query: FindOptionsWhere<Wish>, updateWishDto: UpdateWishDto) {
    try {
      return this.wishRepository.update(query, updateWishDto);
    } catch (err) {
      throw new NotFoundException('Такого подарка не существует');
    }
  }

  removeOne(query: FindOptionsWhere<Wish>) {
    try {
      return this.wishRepository.delete(query);
    } catch (err) {
      throw new NotFoundException('Такого подарка не существует');
    }
  }

  async copy(userId: number, wishId: number) {
    const owner = await this.usersService.findOne({ where: { id: userId }});
    const sourceWish = await this.findOne({ where: { id: wishId }});
    const { copied, id: _, ...wishData } = sourceWish;
    sourceWish.copied = copied + 1;
    await this.wishRepository.save(sourceWish);
    return this.create(owner.id, wishData);
  }
}
