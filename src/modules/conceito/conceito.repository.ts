import { Repository, EntityRepository } from "typeorm";
import { Conceito } from "./conceito.entity";

@EntityRepository(Conceito)
export class ConceitoRepository extends Repository<Conceito>{ }