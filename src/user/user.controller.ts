import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: User['id']) {
    return this.userService.get(id);
  }

  @Get('/')
  getUsers() {
    return this.userService.getAll();
  }

  @Post('/create')
  createUser(@Body() body: User) {
    return this.userService.create(body);
  }

  @Post('/delete')
  deleteUser(@Body() params: any) {
    console.log('id', params);

    return this.userService.delete(params.id);
  }

  @Post('/update')
  update(@Body() body: User) {
    return this.userService.update(body);
  }
}
