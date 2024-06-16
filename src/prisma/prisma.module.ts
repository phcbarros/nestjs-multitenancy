import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // para ter somente uma conexão com o banco para todos os modulos
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
