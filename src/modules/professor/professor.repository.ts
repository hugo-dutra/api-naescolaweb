import { Repository, EntityRepository } from "typeorm";
import { Professor } from "./professor.entity";

@EntityRepository(Professor)
export class ProfessorRepository extends Repository<Professor>{ }