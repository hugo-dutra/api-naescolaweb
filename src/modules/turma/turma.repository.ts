import { Turma } from "./turma.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Turma)
export class TurmaRepository extends Repository<Turma>{ }