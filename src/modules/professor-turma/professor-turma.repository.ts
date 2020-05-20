import { Repository, EntityRepository } from "typeorm";
import { ProfessorTurma } from "./professor-turma.entity";

@EntityRepository(ProfessorTurma)
export class ProfessorTurmaRepository extends Repository<ProfessorTurma>{ }