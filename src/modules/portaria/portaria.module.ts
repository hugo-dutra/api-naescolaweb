import { PortariaRepository } from './portaria.repository';
import { Module } from '@nestjs/common';
import { PortariaService } from './portaria.service';
import { PortariaController } from './portaria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PortariaRepository])],
  providers: [PortariaService],
  controllers: [PortariaController]
})
export class PortariaModule { }
