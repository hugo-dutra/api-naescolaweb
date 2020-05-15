import { GrupoAcesso } from './grupo-acesso.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(GrupoAcesso)
export class GrupoAcessoRepository extends Repository<GrupoAcesso>{ }