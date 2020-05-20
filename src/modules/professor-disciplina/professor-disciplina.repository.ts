import { ProfessorDisciplina } from './professor-disciplina.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(ProfessorDisciplina)
export class ProfessorDisciplinaRepository extends Repository<ProfessorDisciplina>{ }