import { EscopoPerfilUsuarioService } from './../escopo-perfil-usuario/escopo-perfil-usuario.service';
import { ProfessorRepository } from './professor.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from './professor.entity';
import { EscopoPerfilUsuarioRepository } from '../escopo-perfil-usuario/escopo-perfil-usuario.repository';
import { escopo } from './escopo-usuario.enum';
import { Utils } from 'src/utils/utils';
import { EscolaRepository } from '../escola/escola.repository';
import { Escola } from '../escola/escola.entity';

@Injectable()
export class ProfessorService {
  private utils = new Utils();

  constructor(
    @InjectRepository(ProfessorRepository) private professorRepository: ProfessorRepository,
    @InjectRepository(EscopoPerfilUsuarioRepository) private escopoPerfilUsuarioRepository: EscopoPerfilUsuarioRepository,
    @InjectRepository(EscolaRepository) private escolaRepository: EscolaRepository,
    private escopoPerfilUsuarioService: EscopoPerfilUsuarioService,
  ) { }

  public inserir(professor: Professor): Promise<Professor> {
    return new Promise((resolve, reject) => {
      this.verificarExistencia(professor).then(existe => {
        if (!existe) {
          this.professorRepository.save(professor).then((professor: Professor) => {
            resolve(professor);
          })
        } else {
          resolve(null);
        }
      }).catch((reason: any) => {
        reject(reason);
      })
    });
  }

  public listar(limit: number, offset: number, asc: boolean, usr_id: number, esc_id: number): Promise<Professor[]> {
    return new Promise((resolve, reject) => {
      this.escopoPerfilUsuarioService.listarNivelAcessoUsuario(usr_id, esc_id).then((escopoUsuario: string) => {
        const nomeEscopo = escopoUsuario['nome'];
        if (nomeEscopo == escopo.LOCAL) {
          this.listarEscopoLocal(limit, offset, esc_id, asc).then((professores: Professor[]) => {
            resolve(professores);
          }).catch((reason: any) => {
            reject(reason);
          });
        }

        if (nomeEscopo == escopo.REGIONAL) {
          this.listarEscopoRegional(limit, offset, esc_id, usr_id, asc).then((professores: Professor[]) => {
            resolve(professores);
          }).catch((reason: any) => {
            reject(reason);
          });
        }

        if (nomeEscopo == escopo.GLOBAL) {
          this.listarEscopoGlobal(limit, offset, asc).then((professores: Professor[]) => {
            resolve(professores);
          }).catch((reason: any) => {
            reject(reason);
          });
        }

      });
    });
  }

  public listarEscopoLocal(limit: number, offset: number, esc_id: number, asc: boolean): Promise<Professor[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'prf.prf_id_int as id',
        'prf.prf_nome_txt as nome',
        'prf.prf_email_txt as email',
        'prf.prf_matricula_txt as matricula',
        'prf.prf_cpf_txt as cpf',
        'prf.prf_telefone_txt as telefone'
      ];
      this.professorRepository.createQueryBuilder('prf')
        .select(campos)
        .innerJoin('prf.professoresEscolas', 'pre')
        .innerJoin('pre.escola', 'esc')
        .innerJoin('esc.regiaoEscola', 'ree')
        .where('pre.esc_id_int = :esc_id', { esc_id: esc_id })
        .orderBy('prf.prf_nome_txt', asc == true ? 'ASC' : 'DESC')
        .limit(limit)
        .offset(offset).execute().then((professores: Professor[]) => {
          let professoresSemRepetidos = <Professor[]>this.utils.eliminaValoresRepetidos(professores, 'id');
          const totalProfessores = professoresSemRepetidos.length;
          professoresSemRepetidos = professoresSemRepetidos.map(professor => {
            Object.assign(professor, { total: totalProfessores });
            return professor;
          });
          resolve(professoresSemRepetidos);
        }).catch((reason: any) => {
          reject(reason);
        });
    });
  }

  public listarEscopoRegional(limit: number, offset: number, esc_id: number, usr_id: number, asc: boolean): Promise<Professor[]> {
    return new Promise((resolve, reject) => {
      this.pegarIdRegiaoEscolaPorEscolaId(esc_id).then((ree_id: number) => {
        const campos = [
          'prf.prf_id_int as id',
          'prf.prf_nome_txt as nome',
          'prf.prf_email_txt as email',
          'prf.prf_matricula_txt as matricula',
          'prf.prf_cpf_txt as cpf',
          'prf.prf_telefone_txt as telefone',
        ];
        this.professorRepository.createQueryBuilder('prf').select(campos)
          .innerJoin('prf.professoresEscolas', 'pre')
          .innerJoin('pre.escola', 'esc')
          .innerJoin('esc.regiaoEscola', 'ree')
          .where('ree.ree_id_int = :ree_id', { ree_id: ree_id })
          .orderBy('prf.prf_nome_txt', asc == true ? 'ASC' : 'DESC')
          .limit(limit)
          .offset(offset)
          .execute()
          .then((professores: Professor[]) => {
            let professoresSemRepetidos = <Professor[]>this.utils.eliminaValoresRepetidos(professores, 'id');
            const totalProfessores = professoresSemRepetidos.length;
            professoresSemRepetidos = professoresSemRepetidos.map(professor => {
              Object.assign(professor, { total: totalProfessores });
              return professor;
            });
            resolve(professoresSemRepetidos);
          }).catch((reason: any) => {
            reject(reason);
          });
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public listarEscopoGlobal(limit: number, offset: number, asc: boolean): Promise<Professor[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'prf.prf_id_int as id',
        'prf.prf_nome_txt as nome',
        'prf.prf_email_txt as email',
        'prf.prf_matricula_txt as matricula',
        'prf.prf_cpf_txt as cpf',
        'prf.prf_telefone_txt as telefone'
      ];
      this.professorRepository.createQueryBuilder('prf').select(campos)
        .orderBy('prf.prf_nome_txt', asc == true ? 'ASC' : 'DESC')
        .limit(limit)
        .offset(offset)
        .execute()
        .then((professores: Professor[]) => {
          let professoresSemRepetidos = <Professor[]>this.utils.eliminaValoresRepetidos(professores, 'id');
          const totalProfessores = professoresSemRepetidos.length;
          professoresSemRepetidos = professoresSemRepetidos.map(professor => {
            Object.assign(professor, { total: totalProfessores });
            return professor;
          });
          resolve(professoresSemRepetidos);
        }).catch((reason: any) => {
          reject(reason);
        });
    });
  }

  public verificarExistencia(professor: Professor): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.professorRepository.find({ where: { matricula: professor.matricula } })
        .then((professores: Professor[]) => {
          if (professores.length != 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).catch((reason: any) => {
          reject(reason);
        })
    });
  }

  /**
   * Retorno o Id da região da escola (ree_id) da escola informada
   * @param esc_id
   */
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
