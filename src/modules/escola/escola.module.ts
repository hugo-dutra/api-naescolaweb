import { Module } from '@nestjs/common';
import { EscolaService } from './escola.service';
import { EscolaController } from './escola.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscolaRepository } from './escola.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EscolaRepository])],
  providers: [EscolaService],
  controllers: [EscolaController],
  exports: [EscolaService],
})
export class EscolaModule { }
