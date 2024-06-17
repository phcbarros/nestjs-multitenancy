import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRoles } from './user-roles';
import * as bcrypt from 'bcrypt';
import { UpdatePartnerDto } from 'src/partners/dto/update-partner.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  createPartnerUser(data: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        roles: [UserRoles.PARTNER],
        password: this.generateHashPassword(data.password),
      },
    });
  }

  createCommonUser(data: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        roles: [UserRoles.USER],
        password: this.generateHashPassword(data.password),
      },
    });
  }

  generateHashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  async findOne(idOrEmail: number | string) {
    return await this.prismaService.user.findFirst({
      where: {
        ...(typeof idOrEmail === 'number'
          ? {
              id: idOrEmail,
            }
          : {
              email: idOrEmail,
            }),
      },
    });
  }

  async findAllCommonUsers() {
    return await this.prismaService.user.findMany({
      where: {
        roles: {
          array_contains: UserRoles.USER,
        },
      },
    });
  }

  async findAllPartnerUsers() {
    return await this.prismaService.user.findMany({
      where: {
        roles: {
          array_contains: UserRoles.PARTNER,
        },
      },
    });
  }

  async updatePartnerUser(id: number, data: Partial<UpdatePartnerDto>) {
    return await this.prismaService.user.update({
      where: {
        id: Number(id),
      },
      data,
    });
  }
}
