import { UsuarioProfessor } from './usuario-professor.entity';
import { UsuarioProfessorRepository } from './usuario-professor.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioProfessorService {
  constructor(@InjectRepository(UsuarioProfessorRepository) private usuarioProfessorRepository: UsuarioProfessorRepository) { }

  public inserir(dados: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const usr_id = dados['usr_id'];
      const prf_id = dados['prf_id'];
      this.verificarExistencia(usr_id, prf_id).then(existe => {
        if (!existe) {
          const usuarioProfessor = new UsuarioProfessor();
          usuarioProfessor.usr_id = usr_id;
          usuarioProfessor.prf_id = prf_id;
          this.usuarioProfessorRepository.save(usuarioProfessor).then(novoUsuarioProfessor => {
            resolve();
          }).catch(reason => {
            reject(reason);
          });
        }
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public desvincular(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.usuarioProfessorRepository.createQueryBuilder('usp')
        .delete()
        .where('usr_id_int = :usr_id', { usr_id: dados['usr_id'] })
        .execute()
        .then(deleteResult => {
          console.log(deleteResult);
          resolve();
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public verificarExistencia(usr_id: number, prf_id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.usuarioProfessorRepository
        .find({ where: { usr_id: usr_id, prf_id: prf_id } })
        .then((usuariosProfessores: any[]) => {
          if (usuariosProfessores.length != 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

}
