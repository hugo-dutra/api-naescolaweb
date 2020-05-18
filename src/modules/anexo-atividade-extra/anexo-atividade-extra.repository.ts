import { AnexoAtividadeExtra } from './anexo-atividade-extra.entity';
import { Repository, Entity, EntityRepository } from "typeorm";

@EntityRepository(AnexoAtividadeExtra)
export class AnexoAtividadeExtraRepository extends Repository<AnexoAtividadeExtra>{ }