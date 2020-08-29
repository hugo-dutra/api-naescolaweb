import { Repository, EntityRepository } from 'typeorm';
import { Mensao } from './mensao.entity';

@EntityRepository(Mensao)
export class MensaoRepository extends Repository<Mensao>{ }