import { Module } from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieController } from './serie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SerieRepository } from './serie.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SerieRepository])],
  providers: [SerieService],
  controllers: [SerieController]
})
export class SerieModule { }
