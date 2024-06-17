import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  async create(@Body() createPartnerDto: CreatePartnerDto, @Req() req: any) {
    const partner = await this.partnersService.create({
      ...createPartnerDto,
      userId: req.user.id,
    });

    console.log(partner);
    return partner;
  }

  // apenas para questões didáticas
  @Get()
  findAll() {
    return this.partnersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.partnersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
  //   return this.partnersService.update(+id, updatePartnerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.partnersService.remove(+id);
  // }
}
