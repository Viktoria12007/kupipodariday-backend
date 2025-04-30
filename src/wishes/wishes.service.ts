import { Injectable } from '@nestjs/common';
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
    private usersService: UsersService
  ) {}

  create(createWishDto: CreateWishDto) {
    return this.wishRepository.save(createWishDto);
  }

  findMany(query?: FindManyOptions<Wish>) {
    return this.wishRepository.find(query);
  }

  findOne(query: FindOneOptions<Wish>) {
    return this.wishRepository.findOne(query);
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
    return this.wishRepository.update(query, updateWishDto);
  }

  removeOne(query: FindOptionsWhere<Wish>) {
    return this.wishRepository.delete(query);
  }

  async copy(id: number) {
    // const owner = await this.usersService.findOne({ where: { id: userId }});
    // const sourceWish = await this.findOne({ where: { id }});
    // const { copied, id: _, ...wishData } = sourceWish;
    // sourceWish.copied = copied + 1;
    // await this.wishRepository.save(sourceWish);
    // return this.create(wishData, owner.id);
  }
}
