import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findMany(updateUserDto: UpdateUserDto) {
    return this.userRepository.find({ where: updateUserDto });
  }

  findOne(updateUserDto: UpdateUserDto) {
    return this.userRepository.findOne({ where: updateUserDto  });
  }

  updateOne(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  findByUsernameOrEmail(query: string) {
    return this.userRepository.find({ where: [{ username: query}, { email: query} ] });
  }

  // removeOne(id: number) {
  //   return this.userRepository.delete({ id });
  // }
}
