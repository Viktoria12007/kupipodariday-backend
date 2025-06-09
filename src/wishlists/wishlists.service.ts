import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import {InjectRepository} from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { Wishlist } from "./entities/wishlist.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist) private wishlistRepository: Repository<Wishlist>,
    private readonly usersService: UsersService
    ) {}

  async create(userId: number, createWishlistDto: CreateWishlistDto) {
    const owner = await this.usersService.findOne({ where: { id: userId }});
    return this.wishlistRepository.save({...createWishlistDto, owner });
  }

  findMany(query?: FindManyOptions<Wishlist>) {
    return this.wishlistRepository.find(query);
  }

  findOne(query: FindOneOptions<Wishlist>) {
    const wishlist = this.wishlistRepository.findOne(query);
    if (!wishlist) {
      throw new NotFoundException('Такого списка подарков не существует!');
    }
    return wishlist;
  }

  updateOne(query: FindOptionsWhere<Wishlist>, updateWishlistDto: UpdateWishlistDto) {
    try {
      return this.wishlistRepository.update(query, updateWishlistDto);
    } catch (err) {
      throw new NotFoundException('Такого списка подарков не существует');
    }
  }

  removeOne(query: FindOptionsWhere<Wishlist>) {
    try {
      return this.wishlistRepository.delete(query);
    } catch (err) {
      throw new NotFoundException('Такого списка подарков не существует');
    }
  }
}
