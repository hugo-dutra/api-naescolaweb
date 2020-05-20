import { ProfessorEscolaRepository } from './professor-escola.repository';
import { Module } from '@nestjs/common';
import { ProfessorEscolaService } from './professor-escola.service';
import { ProfessorEscolaController } from './professor-escola.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorEscolaRepository])],
  providers: [ProfessorEscolaService],
  controllers: [ProfessorEscolaController]
})
export class ProfessorEscolaModule { }
