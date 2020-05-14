import { Repository, EntityRepository } from "typeorm";
import { Escola } from "./escola.entity";

@EntityRepository(Escola)
export class EscolaRepository extends Repository<Escola>{ }