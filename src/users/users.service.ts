import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
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
      return this.userRepository.save(user);
    } catch (err) {
      if (err instanceof QueryFailedError && err.driverError?.code === '23505') {
        throw new ConflictException('Пользователь с таким e-mail уже существует');
      }
      throw new BadRequestException('Переданы некорректные данные при создании пользователя');
    }
  }

  findMany(query?: FindManyOptions<User>) {
    return this.userRepository.find(query);
  }

  findOne(query: FindOneOptions<User>) {
    const user = this.userRepository.findOne(query);
    if (!user) {
      throw new NotFoundException('Такого пользователя не существует!');
    }
    return user;
  }

  async updateOne(query: FindOneOptions<User>, updateUserDto: UpdateUserDto) {
    try {
      const { password } = updateUserDto;
      const user = this.findOne(query);
      if (password) {
        updateUserDto.password = await hashValue(password);
      }
      return this.userRepository.save({ ...user, ...updateUserDto });
    } catch (err) {
      if (err instanceof QueryFailedError && err.driverError?.code === '23505') {
        throw new ConflictException('Новый e-mail уже занят');
      }
      throw new BadRequestException('Переданы некорректные данные при обновлении пользователя');
    }
  }

  // findByUsernameOrEmail(query: FindOneOptions<User>) {
  //   return this.userRepository.find(query);
    // return this.userRepository.find({ where: [{ username: query}, { email: query} ] });
  // }

  // removeOne(query: FindOptionsWhere<User>) {
  //   return this.userRepository.delete(query);
  // }
}
