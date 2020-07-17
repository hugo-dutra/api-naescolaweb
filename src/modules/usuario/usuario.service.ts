import { UsuarioEscola } from './../usuario-escola/usuario-escola.entity';
import { UsuarioProfessorRepository } from './../usuario-professor/usuario-professor.repository';
import { Injectable, UnauthorizedException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { EscolaRepository } from '../escola/escola.repository';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt'
import { UsuarioEscolaRespository } from '../usuario-escola/usuario-escola.repository';
import { JwtService } from '@nestjs/jwt';
import { EscopoPerfilUsuarioRepository } from '../escopo-perfil-usuario/escopo-perfil-usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioRepository) private usuarioRepository: UsuarioRepository,
    @InjectRepository(UsuarioProfessorRepository) private usuarioProfessorRepository: UsuarioProfessorRepository,
    @InjectRepository(EscolaRepository) private escolaRepository: EscolaRepository,
    @InjectRepository(UsuarioEscolaRespository) private usuarioEscolaRespository: UsuarioEscolaRespository,
    @InjectRepository(EscopoPerfilUsuarioRepository) private escopoPerfilUsuarioRepository: EscopoPerfilUsuarioRepository,
    private jwtService: JwtService
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

  public listarPermissoes(req: Request, esc_id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const token = req.headers['authorization'];
      const { exp, iat, usuario } = this.jwtService.verify(token);
      const usr_id = (<Usuario>usuario).id;
      const campos = [
        'pac_rota_txt as rota', 'pac_permissao_acesso_txt as nome', 'esc.esc_id_int as esc_id'
      ];
      this.usuarioRepository.createQueryBuilder('usr')
        .select(campos)
        .innerJoin('usr.usuariosEscolas', 'usee')
        .innerJoin('usee.perfilUsuario', 'pru')
        .innerJoin('pru.perfisPermissao', 'pep')
        .innerJoin('pep.permissaoAcesso', 'pac')
        .innerJoin('usee.escola', 'esc')
        .where('usee.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('usr.usr_id_int = :usr_id', { usr_id: usr_id })
        .execute()
        .then(permissoes => {
          this.pegarDados(usr_id).then(dados => {
            this.listarGrupoDeAcesso(esc_id, usr_id).then(grupos => {
              this.listarMenuAcesso(esc_id, usr_id).then(menus => {
                this.listarDadosEscola(esc_id).then(dados_escola => {
                  this.listarDadosEscopoPerfil(esc_id, usr_id).then(escopo_perfil => {
                    this.verificarStatusAtivoUsuario(esc_id, usr_id).then(status_ativo_usuario => {
                      const retorno = {
                        permissoes: permissoes,
                        dados: dados,
                        grupos: grupos,
                        menus: menus,
                        dados_escola: dados_escola,
                        escopo_perfil: escopo_perfil,
                        status_ativo_usuario: status_ativo_usuario
                      }
                      resolve(retorno);
                    }).catch(reason => {
                      reject(reason);
                    })
                  }).catch(reason => {
                    reject(reason);
                  })
                }).catch(reason => {
                  reject(reason);
                })
              }).catch(reason => {
                reject(reason);
              })
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

  public verificarStatusAtivoUsuario(esc_id: number, usr_id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const campos = ['use_status_ativo as status_ativo_usuario'];
      this.usuarioEscolaRespository.createQueryBuilder('usee')
        .select(campos)
        .where('usr_id_int = :usr_id', { usr_id: usr_id })
        .andWhere('esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then(statusAtivo => {
          resolve(statusAtivo)
        }).catch(reason => {
          reject(reason)
        });
    })
  }

  public listarDadosEscopoPerfil(esc_id: number, usr_id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const campos = [
        'usee.esc_id_int as esc_id', 'usee.usr_id_int as usr_id',
        'epu.epu_id_int as epu_id', 'epu.epu_nome_txt as nome',
        'epu.epu_nivel_int as nivel'
      ]
      this.escopoPerfilUsuarioRepository.createQueryBuilder('epu')
        .select(campos)
        .innerJoin('epu.perfilUsuario', 'pru')
        .innerJoin('pru.usuariosEscolas', 'usee')
        .where('usee.usr_id_int = :usr_id', { usr_id: usr_id })
        .andWhere('usee.esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then(dadosEscopo => {
          resolve(dadosEscopo);
        }).catch(reason => {
          reject(reason);
        })
    })
  }

  public listarDadosEscola(esc_id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const campos = [
        'esc.esc_id_int as id', 'esc.ren_id_int as ren_id',
        'esc.esc_nome_txt as nome', 'esc.esc_email_txt as email',
        'esc.esc_telefone_txt as telefone', 'esc.esc_endereco_txt as endereco',
        'esc.esc_logo_txt as logo', 'esc.ree_id_int as ree_id',
        'esc.esc_inep_txt as inep', 'esc.esc_cep_txt as cep',
        'esc.esc_cnpj_txt as cnpj', 'ren_nome_txt as rede_ensino',
        'ren_abreviatura_txt as abv_rede_ensino', 'ren_email_txt as email_rede_ensino',
        'ren_responsavel_txt as responsavel_rede_ensino', 'ren_telefone_txt as telefone_rede_ensino',
        'ren_endereco_txt as endereco_rede_ensino', 'ren_cnpj_txt as cnpj_rede_ensino',
        'ren_logo_txt as logo_rede_ensino', 'esc.esc_nome_abreviado_txt as nome_abreviado',
        'ree.ree_nome_txt as regiao_escola'
      ];
      this.escolaRepository.createQueryBuilder('esc')
        .select(campos)
        .innerJoin('esc.redeEnsino', 'ren')
        .innerJoin('esc.regiaoEscola', 'ree')
        .where('esc.esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then(dadosEscola => {
          resolve(dadosEscola);
        }).catch(reason => {
          reject(reason);
        })
    })
  }

  public listarMenuAcesso(esc_id: number, usr_id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const campos = [
        'distinct mac_nome_txt as nome', 'mac_imagem_txt as imagem',
        'gac_nome_txt as grupo', 'mac_texto_txt as texto',
        'mac_link_txt as link', 'mac_modulo_txt as modulo',
        'mac_cor_txt as cor'
      ]
      this.usuarioRepository.createQueryBuilder('usr')
        .select(campos)
        .innerJoin('usr.usuariosEscolas', 'usee')
        .innerJoin('usee.escola', 'esc')
        .innerJoin('usee.perfilUsuario', 'pru')
        .innerJoin('pru.perfisPermissao', 'pep')
        .innerJoin('pep.permissaoAcesso', 'pac')
        .innerJoin('pac.menuAcesso', 'mac')
        .innerJoin('mac.grupoAcesso', 'gac')
        .where('usee.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('usee.usr_id_int = :usr_id', { usr_id: usr_id })
        .execute()
        .then(menus => {
          resolve(menus)
        }).catch(reason => {
          reject(reason);
        })
    })
  }

  public listarGrupoDeAcesso(esc_id: number, usr_id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const campos = [
        'distinct gac_nome_txt as nome', 'gac_imagem_txt as imagem',
        'gac_texto_txt as texto', 'esc.esc_id_int as esc_id',
        'gac_modulo_txt as modulo'
      ];
      this.usuarioRepository.createQueryBuilder('usr')
        .select(campos)
        .innerJoin('usr.usuariosEscolas', 'usee')
        .innerJoin('usee.escola', 'esc')
        .innerJoin('usee.perfilUsuario', 'pru')
        .innerJoin('pru.perfisPermissao', 'pep')
        .innerJoin('pep.permissaoAcesso', 'pac')
        .innerJoin('pac.menuAcesso', 'mac')
        .innerJoin('mac.grupoAcesso', 'cag')
        .where('usee.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('usee.usr_id_int = :usr_id', { usr_id: usr_id })
        .execute()
        .then(grupos => {
          resolve(grupos)
        }).catch(reason => {
          reject(reason);
        })
    })
  }

  public pegarDados(usr_id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const campos = [
        'usr_id_int as id', 'usr_nome_txt as nome',
        'usr_email_txt as email', 'usr_foto_txt  as foto'
      ]
      this.usuarioRepository.createQueryBuilder('usr')
        .select(campos)
        .where('usr_id_int = :usr_id', { usr_id: usr_id })
        .execute()
        .then(dados => {
          resolve(dados)
        }).catch(reason => {
          reject(reason);
        })
    })
  }



  public pegarToken(dados: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const email = dados['email'];
      const senha = dados['senha'];
      this.validarLogin(email, senha).then((resultado) => {
        if (resultado['valido']) {
          const usuario = resultado['usuario'];
          delete usuario.senha;
          delete usuario.salt;
          const payload = { usuario: usuario };
          const access_token = this.jwtService.sign(payload);
          resolve({ token: access_token })
        } else {
          reject(new UnauthorizedException('invalid_credentials'));
        }
      })
    })
  }

  public validarLogin(email: string, senha: string): Promise<{ valido: boolean, usuario: Usuario }> {
    return new Promise((resolve, reject) => {
      const campos = ['usr.usr_email_txt as email', 'usr_salt_txt as salt', 'usr_senha_txt senha'];
      this.usuarioRepository.findOne({ email: email }).then(usuario => {
        bcrypt.compare(senha, usuario.senha).then(valido => {
          resolve({ valido, usuario })
        });
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public logar(dados: any): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('Usuario service => logar ', dados);
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
