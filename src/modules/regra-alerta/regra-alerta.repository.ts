import { Repository, EntityRepository } from "typeorm";
import { RegraAlerta } from "./regra-alerta.entity";

@EntityRepository(RegraAlerta)
export class RegraAlertaRepository extends Repository<RegraAlerta>{ }