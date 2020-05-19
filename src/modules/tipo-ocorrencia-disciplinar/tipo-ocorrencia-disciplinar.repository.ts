import { TipoOcorrenciaDisciplinar } from './tipo-ocorrencia-disciplinar.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(TipoOcorrenciaDisciplinar)
export class TipoOcorrenciaDisciplinarRepository extends Repository<TipoOcorrenciaDisciplinar>{ }