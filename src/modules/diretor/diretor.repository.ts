import { Diretor } from "./diretor.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Diretor)
export class DiretorRepository extends Repository<Diretor>{ }