import { Repository, EntityRepository } from "typeorm";
import { ProfessorEscola } from "./professor-escola.entity";

@EntityRepository(ProfessorEscola)
export class ProfessorEscolaRepository extends Repository<ProfessorEscola>{ }