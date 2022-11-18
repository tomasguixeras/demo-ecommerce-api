import { Controller, Get, Patch, Post, Param, Body } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  createUser(@Body() data: CreateUserDto) {
    console.log('controller ->', data);
    return this.userService.createUser(data);
  }

  @Patch(':id')
  updateUser(@Param() param, @Body() data) {
    return this.userService.updateUser(param.id, data);
  }
}
