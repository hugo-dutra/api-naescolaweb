import { Module } from '@nestjs/common';
import { RedeEnsinoService } from './rede-ensino.service';
import { RedeEnsinoController } from './rede-ensino.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedeEnsinoRepository } from './rede-ensino.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RedeEnsinoRepository])],
  providers: [RedeEnsinoService],
  controllers: [RedeEnsinoController]
})
export class RedeEnsinoModule { }
