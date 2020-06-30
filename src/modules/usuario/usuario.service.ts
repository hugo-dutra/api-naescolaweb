import { UsuarioProfessorRepository } from './../usuario-professor/usuario-professor.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { EscolaRepository } from '../escola/escola.repository';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioRepository) private usuarioRepository: UsuarioRepository,
    @InjectRepository(UsuarioProfessorRepository) private usuarioProfessorRepository: UsuarioProfessorRepository,
    @InjectRepository(EscolaRepository) private escolaRepository: EscolaRepository,
  ) { }

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
      console.log(valor, limit, offset, esc_id);
      resolve([])
    })
  }

}
