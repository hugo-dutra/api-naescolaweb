import { Repository, EntityRepository } from "typeorm";
import { RedeEnsino } from "./rede-ensino.entity";

@EntityRepository(RedeEnsino)
export class RedeEnsinoRepository extends Repository<RedeEnsino>{ }