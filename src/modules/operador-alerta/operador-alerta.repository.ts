import { OperadorAlerta } from './operador-alerta.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(OperadorAlerta)
export class OperadorAlertaRepository extends Repository<OperadorAlerta>{ }