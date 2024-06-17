import { Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartnersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto & { userId: number }) {
    // modo transação para garantir integridade dos dados
    const partner = await this.prismaService.$transaction(async (prisma) => {
      // cria o parceiro
      const partner = await prisma.partner.create({
        data: {
          name: createPartnerDto.name,
        },
      });

      // associa o parceiro ao usuário
      await prisma.partnerUser.create({
        data: {
          userId: createPartnerDto.userId,
          partnerId: partner.id,
        },
      });

      return partner;
    });

    return partner;
  }

  async findAll() {
    return await this.prismaService.partner.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} partner`;
  }

  update(id: number, updatePartnerDto: UpdatePartnerDto) {
    return `This action updates a #${id} partner`;
  }

  remove(id: number) {
    return `This action removes a #${id} partner`;
  }
}
