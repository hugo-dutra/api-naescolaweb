import { UsuarioProfessorRepository } from './../usuario-professor/usuario-professor.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioRepository) private usuarioRepository: UsuarioRepository,
    @InjectRepository(UsuarioProfessorRepository) private usuarioProfessorRepository: UsuarioProfessorRepository,
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
        this.listarIdsUsuairoProfessor().then(usrIds => {
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

  public listarIdsUsuairoProfessor(): Promise<number[]> {
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

}
