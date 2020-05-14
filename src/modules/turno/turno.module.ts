import { Module } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnoRepository } from './turno.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TurnoRepository])],
  providers: [TurnoService],
  controllers: [TurnoController]
})
export class TurnoModule { }
