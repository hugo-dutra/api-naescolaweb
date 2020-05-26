import { DiretorRepository } from './diretor.repository';
import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diretor } from './diretor.entity';
import { DiretorEscolaRepository } from '../diretor-escola/diretor-escola.repository';
import { DiretorEscola } from '../diretor-escola/diretor-escola.entity';
import { ListagemDiretorDto } from './dto/listagem.dto';
import { EscolaRepository } from '../escola/escola.repository';
import { Escola } from '../escola/escola.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class DiretorService {
  constructor(
    @InjectRepository(DiretorRepository) private diretorRepositoty: DiretorRepository,
    @InjectRepository(DiretorEscolaRepository) private diretorEscolaRepository: DiretorEscolaRepository,
    @InjectRepository(EscolaRepository) private escolaRepository: EscolaRepository,

  ) { }

  public inserir(diretor: Diretor, esc_id: number): Promise<[Diretor, DiretorEscola]> {
    return new Promise((resolve, reject) => {
      this.verificarExistencia(diretor.matricula).then((existe: boolean) => {
        if (!existe) {
          this.diretorRepositoty.save(diretor).then((novoDiretor: Diretor) => {
            const dir_id = novoDiretor.id;
            const diretorEscola = new DiretorEscola();
            diretorEscola.dir_id = dir_id;
            diretorEscola.esc_id = esc_id;
            this.inserirDiretorEscola(diretorEscola).then((novoDiretorEscola: DiretorEscola) => {
              resolve([novoDiretor, novoDiretorEscola])
            })
          }).catch((reason: any) => {
            reject(reason);
          });
        } else {
          reject(new BadRequestException({ diretor }, 'Matrícula já cadastrada'));
        }
      });
    });
  }

  public listarGlobal(limit: number, offset: number, asc: boolean): Promise<ListagemDiretorDto[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'dir_id_int as  id', 'dir_nome_txt as nome', 'dir_telefone_txt as telefone',
        'dir_email_txt as email', 'dir_foto_txt as foto', 'dir_matricula_txt as matricula',
      ];

      this.diretorRepositoty
        .createQueryBuilder('dir')
        .select(campos).orderBy('dir.dir_nome_txt', asc == true ? 'ASC' : 'DESC')
        .offset(offset)
        .limit(limit)
        .getRawMany().then((diretores: ListagemDiretorDto[]) => {
          const totalDiretores = diretores.length;
          diretores = diretores.map(diretor => {
            diretor.total = totalDiretores;
            return diretor;
          });
          resolve(diretores);
        }).catch((reason: any) => {
          reject(reason);
        });
    })
  }

  public listarRegional(limit: number, offset: number, asc: boolean, esc_id: number): Promise<ListagemDiretorDto[]> {
    return new Promise((resolve, reject) => {
      this.pegarIdRegiaoEscolaPorEscolaId(esc_id).then((ree_id: number) => {
        const campos = [
          'dir.dir_id_int as  id', 'dir.dir_nome_txt as nome', 'dir.dir_telefone_txt as telefone',
          'dir.dir_email_txt as email', 'dir.dir_foto_txt as foto', 'dir.dir_matricula_txt as matricula',
        ];

        this.diretorRepositoty
          .createQueryBuilder('dir')
          .innerJoin('dir.diretoresEscolas', 'diesc')
          .innerJoin('diesc.escola', 'esc')
          .where('esc.ree_id_int = :ree_id', { ree_id: ree_id })
          .select(campos)
          .offset(offset)
          .limit(limit)
          .orderBy('dir.dir_nome_txt', asc == true ? 'ASC' : 'DESC')
          .getRawMany().then((diretores: ListagemDiretorDto[]) => {
            const totalDiretores = diretores.length;
            diretores = diretores.map(diretor => {
              diretor.total = totalDiretores;
              return diretor;
            });
            resolve(diretores);
          }).catch((reason: any) => {
            reject(reason);
          });
      }).catch((reason: any) => {
        reject(reason);
      })
    })
  }

  public listarLocal(limit: number, offset: number, asc: boolean, esc_id: number): Promise<ListagemDiretorDto[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'dir.dir_id_int as  id', 'dir.dir_nome_txt as nome', 'dir.dir_telefone_txt as telefone',
        'dir.dir_email_txt as email', 'dir.dir_foto_txt as foto', 'dir.dir_matricula_txt as matricula',
      ];

      this.diretorRepositoty
        .createQueryBuilder('dir')
        .innerJoin('dir.diretoresEscolas', 'diesc')
        .innerJoin('diesc.escola', 'esc')
        .where('esc.esc_id_int = :esc_id', { esc_id: esc_id })
        .select(campos)
        .offset(offset)
        .limit(limit)
        .orderBy('dir.dir_nome_txt', asc == true ? 'ASC' : 'DESC')
        .getRawMany().then((diretores: ListagemDiretorDto[]) => {
          const totalDiretores = diretores.length;
          diretores = diretores.map(diretor => {
            diretor.total = totalDiretores;
            return diretor;
          });
          resolve(diretores);
        }).catch((reason: any) => {
          reject(reason);
        });
    });
  }

  public filtrarLocal(valor: string, limit: number, offset: number, esc_id: number): Promise<ListagemDiretorDto[]> {
    return new Promise((resolve, reject) => {
      if (valor.length >= 3) {
        const campos = [
          'dir.dir_id_int as id', 'dir.dir_nome_txt as nome', 'dir.dir_telefone_txt as telefone',
          'dir.dir_email_txt as email', 'dir.dir_foto_txt as foto', 'dir.dir_matricula_txt as matricula',
        ];
        this.diretorRepositoty.createQueryBuilder('dir').select(campos)
          .innerJoin('dir.diretoresEscolas', 'diesc')
          .innerJoin('diesc.escola', 'esc')
          .orWhere('LOWER(dir.dir_nome_txt) like LOWER(:nome)', { nome: `%${valor}%` })
          .orWhere('LOWER(dir.dir_email_txt) like LOWER(:nome)', { nome: `%${valor}%` })
          .orWhere('LOWER(dir.dir_matricula_txt) like LOWER(:nome)', { nome: `%${valor}%` })
          .orderBy('dir.dir_nome_txt', 'ASC')
          .limit(limit)
          .offset(offset)
          .andWhere('esc.esc_id_int = :esc_id', { esc_id: esc_id })
          .execute()
          .then((resultados: ListagemDiretorDto[]) => {
            const total = resultados.length;
            const resultadosComTotal = resultados.map(resultado => {
              resultado.total = total;
              return resultado;
            })
            console.log(resultadosComTotal);
            resolve(resultados);
          }).catch((reason: any) => {
            reject(reason);
          });
      } else {
        resolve(null);
      }
    });
  }

  public filtrarRegional(valor: string, limit: number, offset: number, esc_id: number): Promise<ListagemDiretorDto[]> {
    return new Promise((resolve, reject) => {
      console.log(valor, limit, offset, esc_id);
      if (valor.length >= 3) {
        this.pegarIdRegiaoEscolaPorEscolaId(esc_id).then((ree_id: number) => {
          const campos = [
            'dir.dir_id_int as id', 'dir.dir_nome_txt as nome', 'dir.dir_telefone_txt as telefone',
            'dir.dir_email_txt as email', 'dir.dir_foto_txt as foto', 'dir.dir_matricula_txt as matricula',
          ];
          this.diretorRepositoty.createQueryBuilder('dir').select(campos)
            .innerJoin('dir.diretoresEscolas', 'diesc')
            .innerJoin('diesc.escola', 'esc')
            .orWhere('LOWER(dir.dir_nome_txt) like LOWER(:nome)', { nome: `%${valor}%` })
            .orWhere('LOWER(dir.dir_email_txt) like LOWER(:nome)', { nome: `%${valor}%` })
            .orWhere('LOWER(dir.dir_matricula_txt) like LOWER(:nome)', { nome: `%${valor}%` })
            .orderBy('dir.dir_nome_txt', 'ASC')
            .limit(limit)
            .offset(offset)
            .andWhere('esc.ree_id_int = :ree_id', { ree_id: ree_id })
            .execute()
            .then((resultados: ListagemDiretorDto[]) => {
              const total = resultados.length;
              const resultadosComTotal = resultados.map(resultado => {
                resultado.total = total;
                return resultado;
              })
              console.log(resultadosComTotal);
              resolve(resultados);
            }).catch((reason: any) => {
              reject(reason);
            });
        });
      } else {
        resolve(null);
      }
    })
  }

  public filtrar(valor: string, limit: number, offset: number): Promise<ListagemDiretorDto[]> {
    return new Promise((resolve, reject) => {
      console.log(valor, limit, offset);
      resolve(null);
    })
  }

  public alterar(diretor: Diretor): Promise<Diretor> {
    return new Promise((resolve, reject) => {
      this.diretorRepositoty.save(diretor).then((diretor: Diretor) => {
        resolve(diretor)
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public excluir(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.diretorEscolaRepository
        .createQueryBuilder('die')
        .delete()
        .where('dir_id_int = :dir_id', { dir_id: id }).execute().then(() => {
          this.diretorRepositoty.delete(id).then((deleteResult: DeleteResult) => {
            resolve(deleteResult);
          })
        }).catch((reason: any) => {
          reject(reason);
        })
    });
  }

  public verificarExistencia(matricula: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.diretorRepositoty.find({ where: { matricula: matricula } }).then((diretor: Diretor[]) => {
        if (diretor.length == 1) {
          resolve(true)
        } else {
          resolve(false);
        }
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public inserirDiretorEscola(diretorEscola: DiretorEscola): Promise<DiretorEscola> {
    return new Promise((resolve, reject) => {
      this.verificarExistenciaDiretorEscola(diretorEscola).then((existe: boolean) => {
        if (!existe) {
          this.diretorEscolaRepository.save(diretorEscola).then((novoDiretorEscola: DiretorEscola) => {
            resolve(novoDiretorEscola)
          }).catch((reason: any) => {
            reject(reason);
          });
        } else {
          reject(new BadRequestException({ diretorEscola }, 'Diretor já cadastrado para a escola'));
        }
      });
    });
  }

  public verificarExistenciaDiretorEscola(diretorEscola: DiretorEscola): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.diretorEscolaRepository.find({ where: { dir_id: diretorEscola.dir_id, esc_id: diretorEscola.esc_id } }).then((diretoresEscola: DiretorEscola[]) => {
        if (diretoresEscola.length != 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch((reason: any) => {
        reject(reason);
      })
    })
  }

  public pegarIdRegiaoEscolaPorEscolaId(esc_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.findOne(esc_id).then((escola: Escola) => {
        resolve(escola.ree_id);
      }).catch((reason: any) => {
        reject(reason);
      })
    })
  }

}
