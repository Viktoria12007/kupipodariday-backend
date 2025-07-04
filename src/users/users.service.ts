import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { FindManyOptions, FindOneOptions, QueryFailedError, Repository } from "typeorm";
import { hashValue } from "../helpers/hash";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password } = createUserDto;
      const user = await this.userRepository.create({
        ...createUserDto,
        password: await hashValue(password),
      });
      return await this.userRepository.save(user);
    } catch (err) {
      if (err instanceof QueryFailedError && err.driverError?.code === '23505') {
        throw new BadRequestException('Пользователь с таким username или e-mail уже существует');
      }
      throw new BadRequestException('Переданы некорректные данные при создании пользователя');
    }
  }

  findMany(query?: FindManyOptions<User>) {
    return this.userRepository.find(query);
  }

  async findOne(query: FindOneOptions<User>) {
    const user = await this.userRepository.findOne(query);
    if (!user) {
      throw new NotFoundException('Такого пользователя не существует!');
    }
    return user;
  }

  async updateOne(query: FindOneOptions<User>, updateUserDto: UpdateUserDto) {
    try {
      const { password } = updateUserDto;
      const user = await this.findOne(query);
      if (password) {
        updateUserDto.password = await hashValue(password);
      }
      return await this.userRepository.save({ ...user, ...updateUserDto });
    } catch (err) {
      if (err instanceof QueryFailedError && err.driverError?.code === '23505') {
        throw new BadRequestException('Новый username или e-mail уже занят');
      }
      throw new BadRequestException('Переданы некорректные данные при обновлении пользователя');
    }
  }
}
