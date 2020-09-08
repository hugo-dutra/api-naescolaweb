import { Module } from '@nestjs/common';
import { MetricaLivreController } from './metrica-livre.controller';
import { MetricaLivreService } from './metrica-livre.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricaLivreRepository } from './metrica-livre.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MetricaLivreRepository])],
  controllers: [MetricaLivreController],
  providers: [MetricaLivreService]
})
export class MetricaLivreModule { }
