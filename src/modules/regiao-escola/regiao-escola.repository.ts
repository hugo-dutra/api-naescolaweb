import { Repository, EntityRepository } from "typeorm";
import { RegiaoEscola } from "./regiao-escola.entity";

@EntityRepository(RegiaoEscola)
export class RegiaoEscolaRepository extends Repository<RegiaoEscola>{

}