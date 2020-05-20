import { AreaConhecimento } from './area-conhecimento.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(AreaConhecimento)
export class AreaConhecimentoRepository extends Repository<AreaConhecimento>{ }