import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Wish} from "./entities/wish.entity";

@Injectable()
export class WishesService {
  constructor(@InjectRepository(Wish) private wishRepository: Repository<Wish>) {}

  create(createWishDto: CreateWishDto) {
    return this.wishRepository.save(createWishDto);
  }

  findFew(updateWishDto) {
    return this.wishRepository.findBy(updateWishDto);
  }

  findOne(id: number) {
    return this.wishRepository.findOneBy({ id });
  }

  updateOne(id: number, updateWishDto: UpdateWishDto) {
    return this.wishRepository.update({ id }, updateWishDto);
  }

  removeOne(id: number) {
    return this.wishRepository.delete({ id });
  }
}
