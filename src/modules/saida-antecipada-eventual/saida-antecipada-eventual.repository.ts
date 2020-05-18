import { Repository, EntityRepository } from "typeorm";
import { SaidaAntecipadaEventual } from "./saida-antecipada-eventual.entity";

@EntityRepository(SaidaAntecipadaEventual)
export class SaidaAntecipadaEventualRepository extends Repository<SaidaAntecipadaEventual>{ }