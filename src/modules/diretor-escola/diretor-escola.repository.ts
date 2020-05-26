import { Repository, EntityRepository } from "typeorm";
import { DiretorEscola } from "./diretor-escola.entity";

@EntityRepository(DiretorEscola)
export class DiretorEscolaRepository extends Repository<DiretorEscola>{ }