import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findMany(query: FindManyOptions<User>) {
    return this.userRepository.find(query);
  }

  findOne(query: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail(query);
  }

  updateOne(query: FindOptionsWhere<User>, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(query, updateUserDto);
  }

  // findByUsernameOrEmail(query: FindOneOptions<User>) {
  //   return this.userRepository.find(query);
    // return this.userRepository.find({ where: [{ username: query}, { email: query} ] });
  // }

  // removeOne(query: FindOptionsWhere<User>) {
  //   return this.userRepository.delete(query);
  // }
}
