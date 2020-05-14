import { EtapaEnsino } from "./etapa-ensino.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(EtapaEnsino)
export class EtapaEnsinoRepository extends Repository<EtapaEnsino>{ }