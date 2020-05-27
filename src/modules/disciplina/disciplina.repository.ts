import { Repository, EntityRepository } from "typeorm";
import { Disciplina } from "./disciplina.entity";

@EntityRepository(Disciplina)
export class DisciplinaRepository extends Repository<Disciplina>{
}