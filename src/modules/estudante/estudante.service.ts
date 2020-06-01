import { EscolaService } from './../escola/escola.service';
import { EstudanteDto } from './dto/estudante.dto';
import { EstudanteIntegracaoDto } from './dto/estudante-integracao.dto';
import { EstudanteRepository } from './estudante.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudante } from './estudante.entity';
import { InsertResult } from 'typeorm';
import { promises } from 'dns';

@Injectable()
export class EstudanteService {
  constructor(@InjectRepository(EstudanteRepository) private estudanteRepository: EstudanteRepository, private escolaService: EscolaService) { }

  public inserir(estudante: EstudanteDto): Promise<EstudanteDto> {
    estudante.status_ativo = 1;
    estudante.envio_msg_status = 1;
    return new Promise((resolve, reject) => {
      this.verificarExistencia(estudante).then(existe => {
        if (!existe) {
          this.estudanteRepository.save(estudante).then(novoEstudante => {
            console.log(novoEstudante);
            resolve(novoEstudante);
          })
        } else {
          resolve(null);
        }
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public inserirEstudanteIntegracao(estudantesIntegracao: EstudanteIntegracaoDto[], esc_id: number): Promise<Estudante[]> {
    return new Promise((resolve, reject) => {
      const estudantes = estudantesIntegracao.map((estudanteIntegracao: EstudanteIntegracaoDto) => {
        const estudante = new Estudante();
        estudante.id = estudanteIntegracao.idpes;
        estudante.cep = estudanteIntegracao.cep;
        estudante.endereco = estudanteIntegracao.bai_no + ' ' + estudanteIntegracao.log_no + ' ' + estudanteIntegracao.complemento;
        estudante.envio_msg_status = 1;
        estudante.mae = estudanteIntegracao.nome_mae;
        estudante.matricula = estudanteIntegracao.cod_matricula;
        estudante.nascimento = estudanteIntegracao.data_nasc;
        estudante.nome = estudanteIntegracao.nome;
        estudante.pai = estudanteIntegracao.nome_pai;
        estudante.responsavel = estudanteIntegracao.nome_resp;
        estudante.envio_msg_status = 1;
        estudante.status_ativo = 1;
        estudante.esc_id = esc_id;
        return estudante;
      });
      let contaEstudantesInseridas = 0;
      let arrayEstudantesInseridas = new Array<Estudante>();
      estudantes.forEach((estudante: Estudante) => {
        this.verificarExistenciaIntegracao(estudante).then((existe: boolean) => {
          contaEstudantesInseridas++
          if (!existe) {
            const queryString = 'insert into estudante_est ' +
              '( ' +
              'est_id_int, ' +
              'est_cep_txt, ' +
              'est_nome_txt, ' +
              'est_matricula_txt,' +
              'est_pai_txt,' +
              'est_mae_txt,' +
              'est_responsavel_txt,' +
              'est_endereco_txt,' +
              'est_status_ativo_int, ' +
              'est_envio_msg_status_int, ' +
              'est_nascimento_dte, ' +
              'esc_id_int' +
              ') values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
            this.estudanteRepository.query(queryString,
              [
                estudante.id, estudante.cep, estudante.nome,
                estudante.matricula, estudante.pai, estudante.mae,
                estudante.responsavel, estudante.endereco, estudante.status_ativo,
                estudante.envio_msg_status, estudante.nascimento, estudante.esc_id
              ]).then(() => {
                arrayEstudantesInseridas.push(estudante);
                if (contaEstudantesInseridas == 1) {
                  resolve(null);
                }
                if (contaEstudantesInseridas == estudantes.length) {
                  resolve(arrayEstudantesInseridas);
                }
              })
          } else {
            resolve(null)
          }
        }).catch((reason: any) => {
          reject(reason);
        });
      });
    });
  }

  public listarLocal(limit: number, offset: number, asc: boolean, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'est.est_id_int as id', 'est.est_nome_txt as nome', 'est.est_matricula_txt as matricula',
        'est.est_pai_txt as pai', 'est.est_mae_txt as mae', 'est.est_responsavel_txt as responsavel',
        'est.est_email_txt as email', 'est.est_endereco_txt as endereco', 'est.est_tipo_sanguineo_txt as tipo_sanguineo',
        'est.est_envio_msg_status_int as envio_msg_status', 'est.est_status_ativo_int as status_ativo', 'est.est_nascimento_dte as nascimento',
        'est.est_foto_txt as foto', 'est.est_cep_txt as cep', 'trm.trm_id_int as trm_id'];
      this.estudanteRepository.createQueryBuilder('est').select(campos)
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .where('est.esc_id_int = :esc_id', { esc_id: esc_id })
        .orderBy('est.est_nome_txt', asc == true ? 'ASC' : 'DESC')
        .limit(limit)
        .offset(offset)
        .execute()
        .then((estudantes: any[]) => {
          this.totalEstudantesEscola(esc_id).then(total => {
            estudantes.map(estudante => {
              Object.assign(estudante, { total: total })
              return estudante;
            });
            resolve(estudantes);
          }).catch(reason => {
            reject(reason)
          })
        }).catch(reason => {
          reject(reason);
        });
    });
  }

  public listarRegional(limit: number, offset: number, asc: boolean, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'est.est_id_int as id', 'est.est_nome_txt as nome', 'est.est_matricula_txt as matricula',
        'est.est_pai_txt as pai', 'est.est_mae_txt as mae', 'est.est_responsavel_txt as responsavel',
        'est.est_email_txt as email', 'est.est_endereco_txt as endereco', 'est.est_tipo_sanguineo_txt as tipo_sanguineo',
        'est.est_envio_msg_status_int as envio_msg_status', 'est.est_status_ativo_int as status_ativo', 'est.est_nascimento_dte as nascimento',
        'est.est_foto_txt as foto', 'est.est_cep_txt as cep'
      ];

      this.escolaService.pegarIdRegiaoEscolaPorEscolaId(esc_id).then(ree_id => {
        this.totalEstudantesRegional(ree_id).then(total => {
          this.estudanteRepository.createQueryBuilder('est').select(campos)
            .innerJoin('est.escola', 'esc')
            .innerJoin('esc.regiaoEscola', 'ree')
            .where('ree.ree_id_int = :ree_id', { ree_id: ree_id })
            .orderBy('est.est_nome_txt', asc == true ? 'ASC' : 'DESC')
            .limit(limit)
            .offset(offset)
            .execute()
            .then((estudantes: any[]) => {
              estudantes.map(estudante => {
                Object.assign(estudante, { total: total })
                return estudante;
              });
              resolve(estudantes);
            }).catch(reason => {
              reject(reason);
            });
        }).catch(reason => {
          reject(reason);
        });
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public listarGlobal(limit: number, offset: number, asc: boolean): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'est.est_id_int as id', 'est.est_nome_txt as nome', 'est.est_matricula_txt as matricula',
        'est.est_pai_txt as pai', 'est.est_mae_txt as mae', 'est.est_responsavel_txt as responsavel',
        'est.est_email_txt as email', 'est.est_endereco_txt as endereco', 'est.est_tipo_sanguineo_txt as tipo_sanguineo',
        'est.est_envio_msg_status_int as envio_msg_status', 'est.est_status_ativo_int as status_ativo', 'est.est_nascimento_dte as nascimento',
        'est.est_foto_txt as foto', 'est.est_cep_txt as cep'
      ];

      this.estudanteRepository.createQueryBuilder('est').getCount().then(total => {
        this.estudanteRepository.createQueryBuilder('est')
          .select(campos)
          .limit(limit)
          .offset(offset)
          .orderBy('est.est_nome_txt', asc == true ? 'ASC' : 'DESC')
          .execute().then((estudantes: any[]) => {
            estudantes.map(estudante => {
              Object.assign(estudante, { total: total })
              return estudante;
            });
            resolve(estudantes);
          }).catch(reason => {
            reject(reason);
          })
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public totalEstudantesGlobal(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.estudanteRepository.findAndCount().then(resultado => {
        resolve(resultado[1]);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public totalEstudantesEscola(esc_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.estudanteRepository.find({ where: { esc_id: esc_id } }).then(estudantes => {
        resolve(estudantes.length)
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public totalEstudantesRegional(ree_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.estudanteRepository.createQueryBuilder('est')
        .select(['*'])
        .innerJoin('est.escola', 'esc')
        .where('esc.ree_id_int = :ree_id', { ree_id: ree_id })
        .getCount().then(quantidade => {
          resolve(quantidade);
        }).catch(reason => {
          reject(reason);
        });
    });
  }

  public verificarExistenciaIntegracao(estudante: Estudante): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.estudanteRepository.findByIds([estudante.id]).then((series: Estudante[]) => {
        if (series.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public verificarExistencia(estudanteDto: EstudanteDto): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.estudanteRepository.findByIds([estudanteDto.id]).then((series: Estudante[]) => {
        if (series.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }






}
