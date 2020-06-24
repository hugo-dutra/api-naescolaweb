import { PermissaoAcessoRepository } from './permissao-acesso.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissaoAcessoService {
  constructor(@InjectRepository(PermissaoAcessoRepository) private permissaoAcessoRepository: PermissaoAcessoRepository) { }

  public listar(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'pac_id_int as id', 'pac_permissao_acesso_txt as nome', 'pac_rota_txt as rota'
      ];
      this.permissaoAcessoRepository.createQueryBuilder('pac')
        .select(campos)
        .orderBy('mac_id_int', 'ASC')
        .orderBy('pac_permissao_acesso_txt', 'ASC')
        .execute()
        .then(permissoes => {
          resolve(permissoes);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public listarPorPerfilUsuarioId(pru_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'pac.pac_id_int as pac_id',
        'pac.pac_permissao_acesso_txt as nome'
      ];
      this.permissaoAcessoRepository.createQueryBuilder('pac')
        .select(campos)
        .innerJoin('pac.perfisPermissao', 'pep')
        .innerJoin('pep.perfilUsuario', 'pru')
        .where('pru.pru_id_int = :pru_id', { pru_id: pru_id })
        .execute()
        .then(permissoes => {
          resolve(permissoes);
        }).catch(reason => {
          reject(reason);
        });
    })
  }
}
