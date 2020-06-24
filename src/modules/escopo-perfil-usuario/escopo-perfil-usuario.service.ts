import { EscopoPerfilUsuarioRepository } from './escopo-perfil-usuario.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EscopoPerfilUsuarioService {
  constructor(@InjectRepository(EscopoPerfilUsuarioRepository) private escopoPerfilUsuarioRepository: EscopoPerfilUsuarioRepository) { }

  public listarNivelAcessoUsuario(usr_id: number, esc_id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.escopoPerfilUsuarioRepository.createQueryBuilder('epu')
        .select(['epu.epu_nome_txt as nome'])
        .innerJoin('epu.perfilUsuario', 'pru')
        .innerJoin('pru.usuariosEscolas', 'usee')
        .andWhere('usee.usr_id_int = :usr_id', { usr_id: usr_id })
        .andWhere('usee.esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then((escopo: string[]) => {
          resolve(escopo[0]);
        }).catch((reason: any) => {
          reject(reason);
        });
    });
  }

  public listar(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'epu_id_int as epu_id', 'epu_nome_txt as nome', 'epu_nivel_int as nivel'
      ];
      this.escopoPerfilUsuarioRepository.createQueryBuilder('epu')
        .select(campos)
        .execute()
        .then(escopos => {
          resolve(escopos)
        }).catch(reason => {
          reject(reason);
        });
    })
  }

}
