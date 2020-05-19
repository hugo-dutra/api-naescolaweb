import { OcorrenciaDisciplinar } from './ocorrencia-disciplinar.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(OcorrenciaDisciplinar)
export class OcorrenciaDisciplinarRespository extends Repository<OcorrenciaDisciplinar>{ }