import { EscolaRepository } from './escola.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Escola } from './escola.entity';
import { RegiaoEscolaRepository } from '../regiao-escola/regiao-escola.repository';
import { DiretorEscolaRepository } from '../diretor-escola/diretor-escola.repository';

@Injectable()
export class EscolaService {
  constructor(
    @InjectRepository(EscolaRepository) private escolaRepository: EscolaRepository,
    @InjectRepository(RegiaoEscolaRepository) private regiaoEscolaRepository: RegiaoEscolaRepository,
    @InjectRepository(DiretorEscolaRepository) private diretorEscolaRepository: DiretorEscolaRepository,
  ) { }

  public inserir(escolaDto: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const escola = new Escola();
      escola.assinatura_gestor = escolaDto['assinatura_gestor'];
      escola.cep = escolaDto['cep'];
      escola.cnpj = escolaDto['cnpj'];
      escola.email = escolaDto['email'];
      escola.endereco = escolaDto['endereco'];
      escola.inep = escolaDto['inep'];
      escola.nome = escolaDto['nome'];
      escola.logo = escolaDto['logo'];
      escola.nome_abreviado = escolaDto['nome_abreviado'];
      escola.ree_id = parseInt(escolaDto['ree_id']);
      escola.ren_id = parseInt(escolaDto['ren_id']);
      escola.telefone = escolaDto['telefone'];
      this.verificarExistenciaPorInep(escola.inep).then(existe => {
        if (!existe) {
          this.escolaRepository.save(escola).then(novaEscola => {
            resolve();
          }).catch(reason => {
            reject(reason);
          });
        } else {
          resolve('escola existente')
        }
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public listarPorEmailUsuario(email: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = ['esc.esc_id_int as id', 'esc.esc_nome_txt as nome'];
      this.escolaRepository.createQueryBuilder('esc')
        .select(campos)
        .innerJoin('esc.usuariosEscolas', 'usee')
        .innerJoin('usee.usuario', 'usr')
        .where('usr.usr_email_txt = :email', { email: email })
        .andWhere('usee.use_status_ativo = 1')
        .groupBy('esc.esc_id_int')
        .orderBy('esc.esc_nome_txt')
        .execute()
        .then(escolas => {
          resolve(escolas);
        }).catch(reason => {
          reject(reason);
        })
    })
  }

  public listarLocal(limit: number, offset: number, asc: boolean, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'esc.esc_id_int as id', 'esc.ren_id_int as ren_id',
        'esc.esc_nome_txt as nome', 'esc.esc_email_txt as email',
        'esc.esc_telefone_txt as telefone', 'esc.esc_endereco_txt as endereco',
        'esc.esc_logo_txt as logo', 'esc.ree_id_int as ree_id',
        'esc.esc_inep_txt as inep', 'esc.esc_cep_txt as cep',
        'esc.esc_cnpj_txt as cnpj', 'esc.esc_nome_abreviado_txt as nome_abreviado',
        '1 as total', 'esc.esc_assinatura_gestor_txt as assinatura_gestor'
      ];
      this.escolaRepository.createQueryBuilder('esc').select(campos)
        .innerJoin('esc.redeEnsino', 'ren')
        .innerJoin('esc.regiaoEscola', 'ree')
        .where('esc.esc_id_int = :esc_id', { esc_id: esc_id })
        .orderBy('esc.esc_nome_txt', asc ? 'ASC' : 'DESC')
        .limit(limit)
        .offset(offset)
        .execute()
        .then(escolas => {
          resolve(escolas);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public listarRegional(limit: number, offset: number, asc: boolean, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.regiaoEscolaRepository.createQueryBuilder('ree')
        .select('ree.ree_id_int as ree_id')
        .innerJoin('ree.escolas', 'esc')
        .where('esc.esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then(resultado => {
          const ree_id = resultado[0]['ree_id']
          this.totalEscolasRegional(ree_id).then(total => {
            const campos = [
              'esc.esc_id_int as id', 'esc.ren_id_int as ren_id',
              'esc.esc_nome_txt as nome', 'esc.esc_email_txt as email',
              'esc.esc_telefone_txt as telefone', 'esc.esc_endereco_txt as endereco',
              'esc.esc_logo_txt as logo', 'esc.ree_id_int as ree_id',
              'esc.esc_inep_txt as inep', 'esc.esc_cep_txt as cep',
              'esc.esc_cnpj_txt as cnpj', 'esc.esc_nome_abreviado_txt as nome_abreviado',
              `${total} as total`, 'esc.esc_assinatura_gestor_txt as assinatura_gestor'
            ];
            this.escolaRepository.createQueryBuilder('esc').select(campos)
              .innerJoin('esc.redeEnsino', 'ren')
              .innerJoin('esc.regiaoEscola', 'ree')
              .where('ree.ree_id_int = :ree_id', { ree_id: ree_id })
              .orderBy('esc.esc_nome_txt', asc ? 'ASC' : 'DESC')
              .limit(limit)
              .offset(offset)
              .execute()
              .then(escolas => {
                resolve(escolas);
              }).catch(reason => {
                reject(reason);
              });
          }).catch(reason => {
            reject(reason);
          })
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public listarGlobal(limit: number, offset: number, asc: boolean): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.totalEscolasGlobal().then(total => {
        const campos = [
          'esc.esc_id_int as id', 'esc.ren_id_int as ren_id',
          'esc.esc_nome_txt as nome', 'esc.esc_email_txt as email',
          'esc.esc_telefone_txt as telefone', 'esc.esc_endereco_txt as endereco',
          'esc.esc_logo_txt as logo', 'esc.ree_id_int as ree_id',
          'esc.esc_inep_txt as inep', 'esc.esc_cep_txt as cep',
          'esc.esc_cnpj_txt as cnpj', 'esc.esc_nome_abreviado_txt as nome_abreviado',
          `${total} as total`, 'esc.esc_assinatura_gestor_txt as assinatura_gestor'
        ];
        this.escolaRepository.createQueryBuilder('esc').select(campos)
          .innerJoin('esc.redeEnsino', 'ren')
          .innerJoin('esc.regiaoEscola', 'ree')
          .orderBy('esc.esc_nome_txt', asc ? 'ASC' : 'DESC')
          .limit(limit)
          .offset(offset)
          .execute()
          .then(escolas => {
            resolve(escolas);
          }).catch(reason => {
            reject(reason);
          });
      })
    })
  }

  public listarAssinaturaGestor(esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.createQueryBuilder('esc')
        .select(['esc_assinatura_gestor_txt as assinatura_gestor'])
        .where('esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then(assinaturaGestor => {
          resolve(assinaturaGestor)
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public filtrarLocal(valor: string, limit: number, offset: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'esc.esc_id_int as id', 'esc.ren_id_int as ren_id',
        'esc.esc_nome_txt as nome', 'esc.esc_email_txt as email',
        'esc.esc_telefone_txt as telefone', 'esc.esc_endereco_txt as endereco',
        'esc.esc_logo_txt as logo', 'esc.ree_id_int as ree_id',
        'esc.esc_inep_txt as inep', 'esc.esc_cep_txt as cep',
        'esc.esc_cnpj_txt as cnpj', 'esc.esc_nome_abreviado_txt as nome_abreviado',
        '1 as total'
      ];
      this.escolaRepository.createQueryBuilder('esc').select(campos)
        .innerJoin('esc.redeEnsino', 'ren')
        .innerJoin('esc.regiaoEscola', 'ree')
        .andWhere('esc.esc_id_int = :esc_id', { esc_id: esc_id })
        .orderBy('esc.esc_nome_txt', 'ASC')
        .limit(limit)
        .offset(offset)
        .execute()
        .then(escolas => {
          resolve(escolas);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public filtrarRegional(valor: string, limit: number, offset: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.pegarIdRegiaoEscolaPorEscolaId(esc_id).then(ree_id => {
        this.contarfiltroTotalPorRegional(valor, ree_id).then(total => {
          const campos = [
            'esc.esc_id_int as id', 'esc.ren_id_int as ren_id',
            'esc.esc_nome_txt as nome', 'esc.esc_email_txt as email',
            'esc.esc_telefone_txt as telefone', 'esc.esc_endereco_txt as endereco',
            'esc.esc_logo_txt as logo', 'esc.ree_id_int as ree_id',
            'esc.esc_inep_txt as inep', 'esc.esc_cep_txt as cep',
            'esc.esc_cnpj_txt as cnpj', 'esc.esc_nome_abreviado_txt as nome_abreviado',
            `${total} as total`
          ];
          this.escolaRepository.createQueryBuilder('esc').select(campos)
            .innerJoin('esc.redeEnsino', 'ren')
            .innerJoin('esc.regiaoEscola', 'ree')
            .andWhere('esc.ree_id_int = :ree_id', { ree_id: ree_id })
            .orWhere('LOWER(esc.esc_nome_txt) like LOWER(:valor)', { valor: `%${valor}%` })
            .orWhere('LOWER(esc.esc_email_txt) like LOWER(:valor)', { valor: `%${valor}%` })
            .orWhere('LOWER(ree.ree_nome_txt) like LOWER(:valor)', { valor: `%${valor}%` })
            .limit(limit)
            .offset(offset)
            .execute().then(escolas => {
              resolve(escolas);
            }).catch(reason => {
              reject(reason);
            });
        });
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public filtrarGlobal(valor: string, limit: number, offset: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.contarFiltroTotalGlobal(valor).then(total => {
        const campos = [
          'esc.esc_id_int as id', 'esc.ren_id_int as ren_id',
          'esc.esc_nome_txt as nome', 'esc.esc_email_txt as email',
          'esc.esc_telefone_txt as telefone', 'esc.esc_endereco_txt as endereco',
          'esc.esc_logo_txt as logo', 'esc.ree_id_int as ree_id',
          'esc.esc_inep_txt as inep', 'esc.esc_cep_txt as cep',
          'esc.esc_cnpj_txt as cnpj', 'esc.esc_nome_abreviado_txt as nome_abreviado',
          `${total} as total`
        ];
        this.escolaRepository.createQueryBuilder('esc').select(campos)
          .innerJoin('esc.redeEnsino', 'ren')
          .innerJoin('esc.regiaoEscola', 'ree')
          .orWhere('LOWER(esc.esc_nome_txt) like LOWER(:valor)', { valor: `%${valor}%` })
          .orWhere('LOWER(esc.esc_email_txt) like LOWER(:valor)', { valor: `%${valor}%` })
          .orWhere('LOWER(ree.ree_nome_txt) like LOWER(:valor)', { valor: `%${valor}%` })
          .limit(limit)
          .offset(offset)
          .orderBy('esc.esc_nome_txt', 'ASC')
          .execute()
          .then(escolas => {
            resolve(escolas);
          }).catch(reason => {
            reject(reason);
          });
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public listarDadosBoletoPagamento(esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'esc.esc_id_int as esc_id',
        'esc.esc_dia_vencimento_int as dia_vencimento',
        'esc.esc_valor_mensalidade_num as valor_mensalidade',
        'esc.esc_desconto_assiduidade_num as desconto_assiduidade',
        'esc.esc_valor_juros_diario_num as valor_juros_diario'
      ];
      this.escolaRepository.createQueryBuilder('esc')
        .select(campos)
        .where('esc.esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then(dadosBoletoPagamento => {
          resolve(dadosBoletoPagamento)
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public listarSemDiretor(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'distinct esc.esc_id_int as id', 'ree.ree_id_int as ree_id',
        'ree.ree_nome_txt as ree_nome', 'esc.esc_nome_txt as nome',
        'esc.esc_email_txt as email', 'esc.esc_telefone_txt as telefone',
        'esc.esc_endereco_txt as enderco', 'esc.esc_logo_txt as logo',
        'esc.esc_inep_txt as inep', 'esc.esc_cep_txt as cep',
        'esc.esc_cnpj_txt as cnpj'
      ];
      this.listarIdsEscolasDiretorEscola().then(ids => {
        this.escolaRepository.createQueryBuilder('esc')
          .select(campos)
          .innerJoin('esc.regiaoEscola', 'ree')
          .where('esc.esc_id_int not in (:...ids)', { ids: ids })
          .orderBy('esc.esc_nome_txt', 'ASC')
          .execute()
          .then(diretoresSemEscola => {
            resolve(diretoresSemEscola)
          }).catch(reason => {
            reject(reason);
          });
      })
    })
  }

  public listarSemDiretorRegional(esc_id): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'distinct esc.esc_id_int as id', 'ree.ree_id_int as ree_id',
        'ree.ree_nome_txt as ree_nome', 'esc.esc_nome_txt as nome',
        'esc.esc_email_txt as email', 'esc.esc_telefone_txt as telefone',
        'esc.esc_endereco_txt as enderco', 'esc.esc_logo_txt as logo',
        'esc.esc_inep_txt as inep', 'esc.esc_cep_txt as cep',
        'esc.esc_cnpj_txt as cnpj'
      ];
      this.pegarIdRegiaoEscolaPorEscolaId(esc_id).then(ree_id => {
        this.listarIdsEscolasDiretorEscola().then(ids => {
          this.escolaRepository.createQueryBuilder('esc')
            .select(campos)
            .innerJoin('esc.regiaoEscola', 'ree')
            .where('esc.esc_id_int not in (:...ids)', { ids: ids })
            .andWhere('esc.ree_id_int = :ree_id', { ree_id: ree_id })
            .orderBy('esc.esc_nome_txt', 'ASC')
            .execute()
            .then(diretoresSemEscola => {
              resolve(diretoresSemEscola)
            }).catch(reason => {
              reject(reason);
            });
        }).catch(reason => {
          reject(reason);
        })
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public listarSemDiretorLocal(esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'distinct esc.esc_id_int as id', 'ree.ree_id_int as ree_id',
        'ree.ree_nome_txt as ree_nome', 'esc.esc_nome_txt as nome',
        'esc.esc_email_txt as email', 'esc.esc_telefone_txt as telefone',
        'esc.esc_endereco_txt as enderco', 'esc.esc_logo_txt as logo',
        'esc.esc_inep_txt as inep', 'esc.esc_cep_txt as cep',
        'esc.esc_cnpj_txt as cnpj'
      ];
      this.listarIdsEscolasDiretorEscola().then(ids => {
        this.escolaRepository.createQueryBuilder('esc')
          .select(campos)
          .innerJoin('esc.regiaoEscola', 'ree')
          .where('esc.esc_id_int not in (:...ids)', { ids: ids })
          .andWhere('esc.esc_id_int = :esc_id', { esc_id: esc_id })
          .orderBy('esc.esc_nome_txt', 'ASC')
          .execute()
          .then(diretoresSemEscola => {
            resolve(diretoresSemEscola);
          }).catch(reason => {
            reject(reason);
          });
      }).catch(reason => {
        reject(reason);
      })


    })
  }

  public listarIdsEscolasDiretorEscola(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      this.diretorEscolaRepository.createQueryBuilder('dec')
        .select(['esc_id_int as esc_id'])
        .execute()
        .then((estIds: any[]) => {
          const ids = estIds.map(id => {
            return id['esc_id'];
          })
          resolve(ids)
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public contarFiltroTotalGlobal(valor: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.createQueryBuilder('esc')
        .innerJoin('esc.redeEnsino', 'ren')
        .innerJoin('esc.regiaoEscola', 'ree')
        .orWhere('LOWER(esc.esc_nome_txt) like LOWER(:valor)', { valor: `%${valor}%` })
        .orWhere('LOWER(esc.esc_email_txt) like LOWER(:valor)', { valor: `%${valor}%` })
        .orWhere('LOWER(ree.ree_nome_txt) like LOWER(:valor)', { valor: `%${valor}%` })
        .getCount().then(quantidade => {
          resolve(quantidade);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public contarfiltroTotalPorRegional(valor: string, ree_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.createQueryBuilder('esc')
        .innerJoin('esc.redeEnsino', 'ren')
        .innerJoin('esc.regiaoEscola', 'ree')
        .andWhere('esc.ree_id_int = :ree_id', { ree_id: ree_id })
        .orWhere('LOWER(esc.esc_nome_txt) like LOWER(:valor)', { valor: `%${valor}%` })
        .orWhere('LOWER(esc.esc_email_txt) like LOWER(:valor)', { valor: `%${valor}%` })
        .orWhere('LOWER(ree.ree_nome_txt) like LOWER(:valor)', { valor: `%${valor}%` })
        .getCount().then(quantidade => {
          resolve(quantidade);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public alterar(escola: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.createQueryBuilder('esc')
        .update()
        .set({
          assinatura_gestor: escola['assinatura_gestor'],
          cep: escola['cep'],
          cnpj: escola['cnpj'],
          email: escola['email'],
          endereco: escola['endereco'],
          inep: escola['inep'],
          logo: escola['logo'],
          nome: escola['nome'],
          nome_abreviado: escola['nome_abreviado'],
          ree_id: escola['ree_id']
        }).where('esc_id_int = :esc_id', { esc_id: escola['id'] }).execute().then(() => {
          resolve()
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public excluir(id: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.delete(id).then(() => {
        resolve();
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public totalEscolasGlobal(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.createQueryBuilder('esc')
        .getCount()
        .then(quantidade => {
          resolve(quantidade);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public totalEscolasRegional(ree_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.createQueryBuilder('esc')
        .innerJoin('esc.redeEnsino', 'ren')
        .innerJoin('esc.regiaoEscola', 'ree')
        .where('ree.ree_id_int = :ree_id', { ree_id: ree_id })
        .getCount()
        .then(quantidade => {
          resolve(quantidade);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public verificarExistenciaPorInep(inep: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.find({ where: { inep: inep } }).then(escolas => {
        if (escolas.length != 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
  }


  public pegarIdRegiaoEscolaPorEscolaId(esc_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.findOne(esc_id).then((escola: Escola) => {
        resolve(escola.ree_id);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }
}
