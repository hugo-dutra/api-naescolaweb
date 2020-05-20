import { DiarioAvaliacao } from './diario-avaliacao.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(DiarioAvaliacao)
export class DiarioAvaliacaoRepository extends Repository<DiarioAvaliacao>{ }