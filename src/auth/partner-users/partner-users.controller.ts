import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserPresenter } from '../users/user.presenter';
import { UsersService } from '../users/users.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Controller('partner/users')
export class PartnerUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createPartner(@Body() data: CreateUserDto) {
    const user = await this.usersService.createPartnerUser(data);
    return new UserPresenter(user);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAllPartnerUsers();
  }

  @Patch(':id')
  async updatePartner(@Body() data: UpdateUserDto, @Param('id') id: number) {
    const user = await this.usersService.updatePartnerUser(id, data);
    return new UserPresenter(user);
  }
}
