import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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

  // findMany(updateWishDto: UpdateWishDto) {
  //   return this.wishRepository.find({ where: updateWishDto });
  // }

  findOne(id: number) {
    return this.wishRepository.findOne({ where: { id } });
  }

  async findLast() {
    return this.wishRepository.find({
      order: { createdAt: "DESC"},
      take: 40,
    })
  }

  async findTop() {
    return this.wishRepository.find({
      order: { copied: "DESC" },
      take: 20,
    })
  }

  updateOne(id: number, updateWishDto: UpdateWishDto) {
    return this.wishRepository.update({ id }, updateWishDto);
  }

  removeOne(id: number) {
    return this.wishRepository.delete({ id });
  }

  async copy(id: number) {
    // const owner = await this.usersService.findOne(userId);
    // const sourceWish = await this.findOne(id);
    // const { copied, id: _, ...wishData } = sourceWish;
    // sourceWish.copied = copied + 1;
    // await this.wishRepository.save(sourceWish);
    // return this.create(wishData, owner.id);
  }
}
