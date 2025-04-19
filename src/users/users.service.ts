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
    // const user = await this.usersRepository.create(createUserDto);
    // return this.usersRepository.save(user);

    return this.userRepository.save(createUserDto);
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({ username });

    return user;
  }

  findFew(updateUserDto) {
    return this.userRepository.findBy(updateUserDto);
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  updateOne(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  removeOne(id: number) {
    return this.userRepository.delete({ id });
  }
}
