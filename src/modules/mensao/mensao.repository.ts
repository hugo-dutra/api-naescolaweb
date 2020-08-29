import { Repository, EntityRepository } from 'typeorm';
import Mensao from './mensao.entity';

@EntityRepository(Mensao)
export default class MensaoRepository extends Repository<Mensao>{

}