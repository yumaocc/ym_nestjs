import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { TestUser } from './user.schema';
import { PaginationDto } from 'src/common/pagination/pagination.dto';

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
  @Post('/query')
  getUsersQuery(@Body() params: PaginationDto) {
    return this.userService.getUsersQuery(params);
  }
  @Post('/create')
  createUser(@Body() body: TestUser) {
    return this.userService.create(body);
  }

  @Post('/delete')
  deleteUser(@Body() params: any) {
    return this.userService.delete(params.id);
  }

  @Post('/update')
  update(@Body() body: TestUser) {
    return this.userService.update(body);
  }
}
