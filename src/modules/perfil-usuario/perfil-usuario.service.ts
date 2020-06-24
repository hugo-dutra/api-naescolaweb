import { PerfilUsuarioRepository } from './perfil-usuario.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PerfilUsuario } from './perfil-usuario.entity';

@Injectable()
export class PerfilUsuarioService {
  constructor(@InjectRepository(PerfilUsuarioRepository) private perfilUsuarioRepository: PerfilUsuarioRepository) { }

  public listar(nivel: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'pru.pru_id_int as id', 'pru.pru_perfil_usuario_txt as nome',
        'epu.epu_id_int as epu_id', 'epu.epu_nome_txt as escopo',
        'epu.epu_nivel_int as nivel_escopo'
      ];
      this.perfilUsuarioRepository.createQueryBuilder('pru')
        .select(campos)
        .innerJoin('pru.escoposPerfisUsuarios', 'epu')
        .where('pru.pru_id_int > 0')
        .andWhere('epu.epu_nivel_int <= :nivel', { nivel: nivel })
        .andWhere('pru.esc_id_int = :esc_id', { esc_id: esc_id })
        .orderBy('pru_perfil_usuario_txt', 'ASC')
        .execute()
        .then(perfis => {
          resolve(perfis);
        }).catch(reason => {
          reject(reason);
        })
    })
  }

  public inserir(perfil: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const perfilUsuario = new PerfilUsuario();
      perfilUsuario.epu_id = perfil['epu_id'];
      perfilUsuario.esc_id = perfil['esc_id'];
      perfilUsuario.perfil_usuario = perfil['nome'];
      this.perfilUsuarioRepository.save(perfilUsuario).then(() => {
        resolve()
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public alterar(perfil: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const perfilUsuario = new PerfilUsuario();
      perfilUsuario.id = perfil['id'];
      perfilUsuario.epu_id = perfil['epu_id'];
      perfilUsuario.perfil_usuario = perfil['nome'];
      this.perfilUsuarioRepository.save(perfilUsuario).then(() => {
        resolve(perfil);
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public excluir(id: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.perfilUsuarioRepository.delete(id).then(() => {
        resolve();
      }).catch(reason => {
        reject(reason);
      })
    })
  }

}
