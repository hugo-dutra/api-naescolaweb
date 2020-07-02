import { UsuarioEscola } from './usuario-escola.entity';
import { UsuarioEscolaRespository } from './usuario-escola.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EscopoPerfilUsuarioRepository } from '../escopo-perfil-usuario/escopo-perfil-usuario.repository';
import { EscolaRepository } from '../escola/escola.repository';

@Injectable()
export class UsuarioEscolaService {
  constructor(
    @InjectRepository(UsuarioEscolaRespository) private usuarioEscolaRespository: UsuarioEscolaRespository,
    @InjectRepository(EscopoPerfilUsuarioRepository) private escopoPerfilUsuarioRepository: EscopoPerfilUsuarioRepository,
    @InjectRepository(EscolaRepository) private escolaRepository: EscolaRepository,
  ) { }

  public inserir(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const usuarios: any[] = dados['usuarios'];
      const escolas: any[] = dados['escolas'];
      const perfis: any[] = dados['perfis'];
      const usuariosEscolas = new Array<UsuarioEscola>();
      usuarios.forEach((usrId) => {
        escolas.forEach((escId, idx) => {
          const usuarioEscola = new UsuarioEscola();
          usuarioEscola.usr_id = usrId;
          usuarioEscola.esc_id = escId;
          usuarioEscola.pru_id = perfis[idx];
          usuariosEscolas.push(usuarioEscola);
        });
      });

      const usuariosEscolasEncontrados = new Array<UsuarioEscola>();
      let contaVerificacoes = 0;
      usuariosEscolas.forEach(usuarioEscola => {
        this.verificarExistencia(usuarioEscola).then(usuarioEscolaEncontrado => {
          contaVerificacoes++;
          if (usuarioEscolaEncontrado) {
            usuarioEscolaEncontrado.pru_id = usuarioEscola.pru_id;
            usuariosEscolasEncontrados.push(usuarioEscolaEncontrado);
          } else {
            usuariosEscolasEncontrados.push(usuarioEscola);
          }
          if (contaVerificacoes == usuariosEscolas.length) {
            this.usuarioEscolaRespository.save(usuariosEscolasEncontrados).then((usuariosEscolasSalvos) => {
              resolve();
            }).catch(reason => {
              reject(reason);
            });
          }
        }).catch(reason => {
          reject(reason);
        });
      });
    })
  }

  public verificarExistencia(usuarioEscola: UsuarioEscola): Promise<UsuarioEscola> {
    return new Promise((resolve, reject) => {
      this.usuarioEscolaRespository.findOne({ where: { usr_id: usuarioEscola.usr_id, esc_id: usuarioEscola.esc_id } })
        .then(usuarioEscola => {
          resolve(usuarioEscola);
        }).catch(reason => {
          reject(reason);
        })
    })
  }





  public listarEscolaPerfilStatus(usr_id: number, esc_id: number, usr_id_solicitante: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.escopoPerfilUsuarioRepository.createQueryBuilder('epu')
        .select('epu_nome_txt')
        .innerJoin('epu.perfilUsuario', 'pru')
        .innerJoin('pru.usuariosEscolas', 'usee')
        .where('usee.usr_id_int = :usr_id_solicitante', { usr_id_solicitante: usr_id_solicitante })
        .andWhere('usee.esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then(escopoUsuario => {
          const escopo = escopoUsuario[0]['epu_nome_txt'];
          switch (escopo) {
            case 'Global':
              resolve(this.listarEscolaGlobalStatus(usr_id));
              break;
            case 'Regional':
              resolve(this.listarEscolaRegionalStatus(usr_id, esc_id));
              break;
            case 'Local':
              resolve(this.listarEscolaLocalStatus(usr_id, esc_id));
              break;
            default:
          }
        }).catch(reason => {
          reject(reason);
        })
    })
  }

  public listarEscolaGlobalStatus(usr_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'use_id_int as use_id', 'esc_nome_txt as nome',
        'pru_perfil_usuario_txt as perfil_usuario', 'use_status_ativo as status_ativo'
      ];
      this.usuarioEscolaRespository.createQueryBuilder('usee')
        .select(campos)
        .innerJoin('usee.escola', 'esc')
        .innerJoin('usee.perfilUsuario', 'pru')
        .where('usee.usr_id_int = :usr_id', { usr_id: usr_id })
        .execute()
        .then((perfisUsuario: any[]) => {
          perfisUsuario = perfisUsuario.map(perfil => {
            if (perfil['status_ativo'] == 0) {
              perfil['status_ativo'] = 'inativo'
            } else {
              perfil['status_ativo'] = 'ativo'
            }
            return perfil;
          });
          resolve(perfisUsuario);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public listarEscolaRegionalStatus(usr_id: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.findOne({ where: { id: esc_id } }).then(escola => {
        const ree_id = escola.ree_id;
        const campos = [
          'use_id_int as use_id', 'esc_nome_txt as nome',
          'pru_perfil_usuario_txt as perfil_usuario', 'use_status_ativo as status_ativo'
        ];
        this.usuarioEscolaRespository.createQueryBuilder('usee')
          .select(campos)
          .innerJoin('usee.escola', 'esc')
          .innerJoin('usee.perfilUsuario', 'pru')
          .where('usee.usr_id_int = :usr_id', { usr_id: usr_id })
          .andWhere('esc.ree_id_int = :ree_id', { ree_id: ree_id })
          .execute()
          .then((perfisUsuario: any[]) => {
            perfisUsuario = perfisUsuario.map(perfil => {
              if (perfil['status_ativo'] == 0) {
                perfil['status_ativo'] = 'inativo'
              } else {
                perfil['status_ativo'] = 'ativo'
              }
              return perfil;
            });
            resolve(perfisUsuario);
          }).catch(reason => {
            reject(reason);
          });
      })
    })
  }

  public listarEscolaLocalStatus(usr_id: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'use_id_int as use_id', 'esc_nome_txt as nome',
        'pru_perfil_usuario_txt as perfil_usuario', 'use_status_ativo as status_ativo'
      ];
      this.usuarioEscolaRespository.createQueryBuilder('usee')
        .select(campos)
        .innerJoin('usee.escola', 'esc')
        .innerJoin('usee.perfilUsuario', 'pru')
        .where('usee.usr_id_int = :usr_id', { usr_id: usr_id })
        .andWhere('esc.esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then((perfisUsuario: any[]) => {
          perfisUsuario = perfisUsuario.map(perfil => {
            if (perfil['status_ativo'] == 0) {
              perfil['status_ativo'] = 'inativo'
            } else {
              perfil['status_ativo'] = 'ativo'
            }
            return perfil;
          })
          resolve(perfisUsuario);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public alterarStatus(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.usuarioEscolaRespository.createQueryBuilder('use')
        .update()
        .set({ status_ativo: dados['status_ativo'] })
        .where('use_id_int = :use_id', { use_id: dados['use_id'] })
        .execute()
        .then(() => {
          resolve();
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public excluir(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(dados);
      resolve();
    })
  }

}
