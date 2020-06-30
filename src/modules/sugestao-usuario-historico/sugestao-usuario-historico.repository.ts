import { Repository, EntityRepository } from 'typeorm';
import { SugestaoUsuarioHistorico } from './sugestao-usuario-historico.entity';

@EntityRepository(SugestaoUsuarioHistorico)
export class SugestaoUsuarioHistoricoRepository extends Repository<SugestaoUsuarioHistorico>{ }