import { UsuarioEscola } from './../usuario-escola/usuario-escola.entity';
import { UsuarioProfessorRepository } from './../usuario-professor/usuario-professor.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { EscolaRepository } from '../escola/escola.repository';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt'
import { UsuarioEscolaRespository } from '../usuario-escola/usuario-escola.repository';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioRepository) private usuarioRepository: UsuarioRepository,
    @InjectRepository(UsuarioProfessorRepository) private usuarioProfessorRepository: UsuarioProfessorRepository,
    @InjectRepository(EscolaRepository) private escolaRepository: EscolaRepository,
    @InjectRepository(UsuarioEscolaRespository) private usuarioEscolaRespository: UsuarioEscolaRespository,
  ) { }

  public inserir(usuarioDto: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const usuario = new Usuario();
      usuario.nome = usuarioDto['nome'];
      usuario.senha = usuarioDto['senha'];
      usuario.email = usuarioDto['email'];
      const esc_id = usuarioDto['esc_id'];
      this.encriptargUsuario(usuario).then(usuarioEncriptado => {
        const teste = usuarioEncriptado;
        this.usuarioRepository.save(usuarioEncriptado).then(novoUsuario => {
          const usr_id = novoUsuario.id
          const usuarioEscola = new UsuarioEscola();
          usuarioEscola.esc_id = esc_id;
          usuarioEscola.usr_id = usr_id;
          usuarioEscola.pru_id = 0;
          this.usuarioEscolaRespository.save(usuarioEscola).then(() => {
            resolve();
          }).catch(reason => {
            reject(reason);
          })
        }).catch(reason => {
          reject(reason);
        });
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public modificarSenha(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      console.clear();
      this.usuarioRepository.findOne({ where: { id: dados['usr_id'] } }).then(usuario => {
        usuario.senha = dados['senha'];
        this.encriptargUsuario(usuario).then(usuarioComSenhaAlterada => {
          this.usuarioRepository.save(usuarioComSenhaAlterada).then(() => {
            resolve();
          }).catch(reason => {
            reject(reason);
          })
        }).catch(reason => {
          reject(reason);
        })
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public logar(dados: any): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(dados);
      resolve([]);
    })
  }

  private encriptargUsuario(usuario: Usuario): Promise<Usuario> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        usuario.salt = salt;
        bcrypt.hash(usuario.senha, usuario.salt, (err, encryptedPassword) => {
          usuario.senha = encryptedPassword;
          resolve(usuario);
        })
      })
    })
  }


  public listarPorEscolaId(esc_id: number, todos: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'distinct usr.usr_id_int as usr_id', 'usr.usr_nome_txt as usuario',
        'usr.usr_email_txt as email', 'usr.usr_foto_txt as foto'
      ];
      if (todos == 'true') {
        this.usuarioRepository.createQueryBuilder('usr').select(campos)
          .innerJoin('usr.usuariosEscolas', 'usee')
          .where('usee.esc_id_int = :esc_id', { esc_id: esc_id })
          .orderBy('usr.usr_nome_txt', 'ASC')
          .execute()
          .then((usuarios: any[]) => {
            resolve(usuarios);
          }).catch(reason => {
            reject(reason);
          });
      } else {
        this.listarIdsUsuarioProfessor().then(usrIds => {
          this.usuarioRepository.createQueryBuilder('usr').select(campos)
            .innerJoin('usr.usuariosEscolas', 'usee')
            .where('usee.esc_id_int = :esc_id', { esc_id: esc_id })
            .andWhere('usr.usr_id_int not in (:...usrIds)', { usrIds: usrIds })
            .orderBy('usr.usr_nome_txt', 'ASC')
            .execute()
            .then((usuarios: any[]) => {
              resolve(usuarios);
            }).catch(reason => {
              reject(reason);
            });
        }).catch(reason => {
          reject(reason);
        });
      }
    })
  }

  public listarIdsUsuarioProfessor(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'usr_id_int as usr_id'
      ];
      this.usuarioProfessorRepository
        .createQueryBuilder('upr')
        .select(campos)
        .execute()
        .then((usrIds: number[]) => {
          const ids = new Array<number>();
          ids.push(0);
          usrIds.forEach(usrId => {
            ids.push(usrId['usr_id'])
          })
          resolve(ids);
        }).catch(reason => {
          reject(reason)
        });
    });
  }

  public listarLocal(limit: number, offset: number, asc: boolean, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.usuarioRepository.createQueryBuilder('usr')
        .innerJoin('usr.usuariosEscolas', 'usee')
        .innerJoin('usee.escola', 'esc')
        .where('esc.esc_id_int = :esc_id', { esc_id: esc_id })
        .groupBy('usr.usr_id_int')
        .getCount().then(total => {
          const campos = [
            'usr.usr_id_int as id', 'usr.usr_nome_txt as nome',
            'usr.usr_email_txt as email', 'usr.usr_foto_txt as foto',
            `${total} as total`
          ];
          this.usuarioRepository.createQueryBuilder('usr')
            .select(campos)
            .innerJoin('usr.usuariosEscolas', 'usee')
            .innerJoin('usee.escola', 'esc')
            .where('esc.esc_id_int = :esc_id', { esc_id: esc_id })
            .groupBy('usr.usr_id_int')
            .limit(limit)
            .offset(offset)
            .execute()
            .then((usuarios: any[]) => {
              resolve(usuarios);
            }).catch(reason => {
              reject(reason);
            });
        });
    })
  }

  public listarRegional(limit: number, offset: number, asc: boolean, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      console.log(limit, offset, asc, esc_id);
      this.escolaRepository.createQueryBuilder('esc')
        .select(['ree_id_int as ree_id'])
        .where('esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then(ree_id_int => {
          const ree_id = ree_id_int[0]['ree_id'];
          this.usuarioRepository.createQueryBuilder('usr')
            .innerJoin('usr.usuariosEscolas', 'usee')
            .innerJoin('usee.escola', 'esc')
            .innerJoin('esc.regiaoEscola', 'ree')
            .where('ree.ree_id_int = :ree_id', { ree_id: ree_id })
            .getCount()
            .then(total => {
              const campos = [
                'usr.usr_id_int as id', 'usr.usr_nome_txt as nome',
                'usr.usr_email_txt as email', 'usr.usr_foto_txt as foto',
                `${total} as total`
              ];
              this.usuarioRepository.createQueryBuilder('usr')
                .select(campos)
                .innerJoin('usr.usuariosEscolas', 'usee')
                .innerJoin('usee.escola', 'esc')
                .innerJoin('esc.regiaoEscola', 'ree')
                .where('ree.ree_id_int = :ree_id', { ree_id: ree_id })
                .groupBy('usr.usr_id_int')
                .orderBy('usr.usr_nome_txt', asc ? 'ASC' : 'DESC')
                .limit(limit)
                .offset(offset)
                .execute()
                .then((usuarios: any[]) => {
                  resolve(usuarios);
                }).catch(reason => {
                  reject(reason);
                });
            })
        }).catch(reason => {
          reject(reason);
        });
    });
  }

  public listarGlobal(limit: number, offset: number, asc: boolean): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.usuarioRepository.createQueryBuilder('usr')
        .getCount()
        .then(total => {
          const campos = [
            'usr_id_int as id', 'usr_nome_txt as nome',
            'usr_email_txt as email', 'usr_foto_txt as foto',
            `${total} as total`
          ];
          this.usuarioRepository.createQueryBuilder('usr')
            .select(campos)
            .orderBy('usr_nome_txt', asc ? 'ASC' : 'DESC')
            .limit(limit)
            .offset(offset)
            .execute()
            .then(usuarios => {
              resolve(usuarios)
            }).catch(reason => {
              reject(reason);
            });
        });
    })
  }

  public filtrarLocal(valor: string, limit: number, offset: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.usuarioRepository.createQueryBuilder('usr')
        .innerJoin('usr.usuariosEscolas', 'usee')
        .innerJoin('usee.escola', 'esc')
        .andWhere('LOWER(usr.usr_nome_txt) like LOWER(:valor)', { valor: `%${valor}%` })
        .andWhere('esc.esc_id_int = :esc_id', { esc_id: esc_id })
        .orderBy('usr.usr_nome_txt', 'ASC')
        .groupBy('usr.usr_id_int').getCount().then(total => {
          const campos = [
            'usr.usr_id_int as id', 'usr.usr_nome_txt as nome',
            'usr.usr_email_txt as email', 'usr.usr_foto_txt as foto',
            `${total} as total`
          ];
          this.usuarioRepository.createQueryBuilder('usr')
            .select(campos)
            .innerJoin('usr.usuariosEscolas', 'usee')
            .innerJoin('usee.escola', 'esc')
            .andWhere('LOWER(usr.usr_nome_txt) like LOWER(:valor)', { valor: `%${valor}%` })
            .andWhere('esc.esc_id_int = :esc_id', { esc_id: esc_id })
            .orderBy('usr.usr_nome_txt', 'ASC')
            .groupBy('usr.usr_id_int')
            .limit(limit)
            .offset(offset)
            .execute()
            .then(usuarios => {
              resolve(usuarios);
            }).catch(reason => {
              reject(reason);
            });
        });
    })
  }

  public filtrarRegional(valor: string, limit: number, offset: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.createQueryBuilder('esc').select(['ree_id_int as ree_id']).where('esc_id_int = :esc_id', { esc_id: esc_id }).execute().then(ree_id_int => {
        const ree_id = ree_id_int[0]['ree_id'];
        this.usuarioRepository.createQueryBuilder('usr')
          .innerJoin('usr.usuariosEscolas', 'usee')
          .innerJoin('usee.escola', 'esc')
          .andWhere('LOWER(usr.usr_nome_txt) like LOWER(:valor)', { valor: `%${valor}%` })
          .andWhere('esc.ree_id_int = :ree_id', { ree_id: ree_id })
          .orderBy('usr.usr_nome_txt', 'ASC')
          .getCount()
          .then(total => {
            const campos = [
              'usr.usr_id_int as id', 'usr.usr_nome_txt as nome',
              'usr.usr_email_txt as email', 'usr.usr_foto_txt as foto',
              `${total} as total`
            ];
            this.usuarioRepository.createQueryBuilder('usr')
              .select(campos)
              .innerJoin('usr.usuariosEscolas', 'usee')
              .innerJoin('usee.escola', 'esc')
              .andWhere('LOWER(usr.usr_nome_txt) like LOWER(:valor)', { valor: `%${valor}%` })
              .andWhere('esc.ree_id_int = :ree_id', { ree_id: ree_id })
              .orderBy('usr.usr_nome_txt', 'ASC')
              .limit(limit)
              .offset(offset)
              .groupBy('usr.usr_id_int').execute().then(usuarios => {
                resolve(usuarios);
              }).catch(reason => {
                reject(reason);
              });
          }).catch(reason => {
            reject(reason);
          });
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public filtrarGlobal(valor: string, limit: number, offset: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.usuarioRepository.createQueryBuilder('usr').getCount().then(total => {
        const campos = [
          'usr.usr_id_int as id', 'usr.usr_nome_txt as nome',
          'usr.usr_email_txt as email', 'usr.usr_foto_txt as foto',
          `${total} as total`
        ];
        this.usuarioRepository.createQueryBuilder('usr')
          .select(campos)
          .andWhere('LOWER(usr.usr_nome_txt) like LOWER(:valor)', { valor: `%${valor}%` })
          .orderBy('usr.usr_nome_txt', 'ASC')
          .limit(limit)
          .offset(offset)
          .execute()
          .then(usuarios => {
            resolve(usuarios);
          }).catch(reason => {
            reject(reason);
          });
      });
    })
  }

  public alterar(usuarioRecebido: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const usuario = new Usuario();
      usuario.id = usuarioRecebido['id'];
      usuario.nome = usuarioRecebido['nome'];
      usuario.email = usuarioRecebido['email'];
      usuario.foto = usuarioRecebido['foto'];
      this.usuarioRepository.save(usuario).then(updateResult => {
        resolve();
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public excluir(parametros: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.usuarioRepository.delete(parametros).then(deleteResult => {
        resolve();
      }).catch(reason => {
        reject(reason);
      });
    })
  }

}
