import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRoles } from './user-roles';
import * as bcrypt from 'bcrypt';

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

  findOne(idOrEmail: number | string) {
    return this.prismaService.user.findFirst({
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
}
