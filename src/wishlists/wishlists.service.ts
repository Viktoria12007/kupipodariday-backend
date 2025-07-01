import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import {InjectRepository} from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, FindOptionsWhere, In, Repository } from "typeorm";
import { Wishlist } from "./entities/wishlist.entity";
import { UsersService } from "../users/users.service";
import { WishesService } from "../wishes/wishes.service";

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist) private wishlistRepository: Repository<Wishlist>,
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService
    ) {}

  async create(userId: number, createWishlistDto: CreateWishlistDto) {
    const owner = await this.usersService.findOne({ where: { id: userId }});
    const items = await this.wishesService.findMany({ where: { id: In(createWishlistDto.itemsId) } });
    return this.wishlistRepository.save({...createWishlistDto, owner, items });
  }

  findMany(query?: FindManyOptions<Wishlist>) {
    return this.wishlistRepository.find(query);
  }

  async findOne(query: FindOneOptions<Wishlist>) {
    const wishlist = await this.wishlistRepository.findOne(query);
    if (!wishlist) {
      throw new NotFoundException('Такого списка подарков не существует!');
    }
    return wishlist;
  }

  async updateOne(userId: number, query: FindOptionsWhere<Wishlist>, updateWishlistDto: UpdateWishlistDto) {
    const owner = await this.usersService.findOne({ where: { id: userId }, relations: { wishlists: true }});
    const sourceWishlist = await this.findOne({ where: { id: query.id } });

    const myWishlist = owner.wishlists.find(wishlist => wishlist.id === sourceWishlist.id);
    if (!myWishlist) {
      throw new ConflictException('Нельзя изменять чужие списки подарков');
    }

    return this.wishlistRepository.update(query, updateWishlistDto);
  }

  async removeOne(userId: number, query: FindOptionsWhere<Wishlist>) {
    const owner = await this.usersService.findOne({ where: { id: userId }, relations: { wishlists: true }});
    const sourceWishlist = await this.findOne({ where: { id: query.id } });

    const myWishlist = owner.wishlists.find(wishlist => wishlist.id === sourceWishlist.id);
    if (!myWishlist) {
      throw new ConflictException('Нельзя удалять чужие списки подарков');
    }

    return this.wishlistRepository.delete(query);
  }
}
