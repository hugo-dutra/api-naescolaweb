import { DiarioProfessor } from './diario-professor.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(DiarioProfessor)
export class DiarioProfessorRepository extends Repository<DiarioProfessor>{ }