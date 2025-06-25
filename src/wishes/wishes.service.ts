import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { Wish } from "./entities/wish.entity";
import { UsersService } from "../users/users.service";
import { ChangedRaisedDto } from "./dto/change-raised-dto";

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
    private readonly usersService: UsersService
  ) {}

  async create(userId: number, createWishDto: CreateWishDto) {
    const owner = await this.usersService.findOne({ where: { id: userId }});
    return this.wishRepository.save({ ...createWishDto, owner, raised: 0, copied: 0 });
  }

  findMany(query?: FindManyOptions<Wish>) {
    return this.wishRepository.find(query);
  }

  findOne(query: FindOneOptions<Wish>) {
    const wish = this.wishRepository.findOne(query);
    if (!wish) {
      throw new NotFoundException('Такого подарка не существует!');
    }
    return wish;
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

  async updateOne(userId: number, query: FindOptionsWhere<Wish>, updateWishDto: UpdateWishDto) {
    const wish = await this.findOne({ where: { id: query.id }, relations: { owner: true } });

    if (wish.owner.id !== userId) {
      throw new ForbiddenException('Нельзя изменять чужие подарки');
    }

    return this.wishRepository.update(query, updateWishDto);
  }

  async removeOne(userId: number, query: FindOptionsWhere<Wish>) {
    const wish = await this.findOne({ where: { id: query.id }, relations: { owner: true } });

    if (wish.owner.id !== userId) {
      throw new ForbiddenException('Нельзя удалять чужие подарки');
    }

    return this.wishRepository.delete(query);
  }

  async copy(userId: number, wishId: number) {
    const owner = await this.usersService.findOne({ where: { id: userId }, relations: { wishes: true }});
    const sourceWish = await this.findOne({ where: { id: wishId }});

    const alreadyCopiedWish = owner.wishes.find(wish => wish.copiedWishId === sourceWish.id);
    if (alreadyCopiedWish) {
      throw new ConflictException('Вы уже копировали себе этот подарок');
    }

    const { copied, id, ...wishData } = sourceWish;
    sourceWish.copied = copied + 1;
    await this.wishRepository.save(sourceWish);
    return this.create(owner.id, { ...wishData, copiedWishId: id });
  }

  set(query: FindOptionsWhere<Wish>, raised: ChangedRaisedDto) {
    try {
      return this.wishRepository.update(query, raised);
    } catch (err) {
      throw new NotFoundException('Такого подарка не существует');
    }
  }
}
