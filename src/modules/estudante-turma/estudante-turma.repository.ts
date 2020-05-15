import { EstudanteTurma } from "./estudante-turma.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(EstudanteTurma)
export class EstudanteTurmaRepository extends Repository<EstudanteTurma>{ }