import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { TestUser } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: TestUser['id']) {
    return this.userService.get(id);
  }

  @Get('/')
  getUsers() {
    return this.userService.getAll();
  }

  @Post('/create')
  createUser(@Body() body: TestUser) {
    return this.userService.create(body);
  }

  @Post('/delete')
  deleteUser(@Body() params: any) {
    console.log('id', params);

    return this.userService.delete(params.id);
  }

  @Post('/update')
  update(@Body() body: TestUser) {
    return this.userService.update(body);
  }
}
