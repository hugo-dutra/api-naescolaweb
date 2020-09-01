import { Repository, EntityRepository } from 'typeorm';
import { Mencao } from './mencao.entity';

@EntityRepository(Mencao)
export class MencaoRepository extends Repository<Mencao>{ }