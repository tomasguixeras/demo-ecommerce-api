import { Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private _usersRepository: Repository<Users>,
  ) {}

  getAllUsers() {
    return this._usersRepository.find();
  }

  getUserById(id: number) {
    return this._usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  createUser(data: CreateUserDto) {
    console.log(data);
    const newUser = this._usersRepository.create(data);
    return this._usersRepository.save(newUser);
  }

  async updateUser(id: number, data) {
    const user = await this._usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return new HttpException('Desbanned', HttpStatus.FORBIDDEN);
    }

    return this._usersRepository.update(id, data);
  }
}
