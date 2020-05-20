import { Repository, EntityRepository } from "typeorm";
import { PeriodoLetivo } from "./periodo-letivo.entity";

@EntityRepository(PeriodoLetivo)
export class PeriodoLetivoRepository extends Repository<PeriodoLetivo>{ }