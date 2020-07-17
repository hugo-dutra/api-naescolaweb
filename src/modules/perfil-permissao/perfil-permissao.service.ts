import { PerfilPermissao } from './perfil-permissao.entity';
import { PerfilPermissaoRepository } from './perfil-permissao.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PerfilPermissaoService {
  constructor(@InjectRepository(PerfilPermissaoRepository) private perfilPermissaoRepository: PerfilPermissaoRepository) { }

  public inserir(dadosPerfilPermissao: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const pru_id = dadosPerfilPermissao['pru_id'];
      this.excluir(pru_id).then(() => {
        const permissoes: any[] = dadosPerfilPermissao['permissoes'];
        const perfisPermissoes = new Array<PerfilPermissao>();
        permissoes.forEach(permissao => {
          const pac_id = permissao['pac_id']
          const perfilPermissao = new PerfilPermissao();
          perfilPermissao.pru_id = pru_id;
          perfilPermissao.pac_id = pac_id;
          perfisPermissoes.push(perfilPermissao);
        });
        this.perfilPermissaoRepository.save(perfisPermissoes).then(() => {
          resolve();
        }).catch(reason => {
          reject(reason);
        });
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public excluir(pru_id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.perfilPermissaoRepository.createQueryBuilder()
        .delete()
        .where('pru_id_int = :pru_id', { pru_id: pru_id })
        .execute()
        .then(deleteResult => {
          resolve();
        }).catch(reason => {
          reject(reason);
        });
    })
  }

}
