import { RegraAlertaUsuario } from './regra-alerta-usuario.entity';
import { RegraAlertaUsuarioRepository } from './regra-alerta-usuario.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

@Injectable()
export class RegraAlertaUsuarioService {
  constructor(@InjectRepository(RegraAlertaUsuarioRepository) private regraAlertaUsuarioRepository: RegraAlertaUsuarioRepository) { }

  public inserir(regraAlertaUsuario: RegraAlertaUsuario[]): Promise<RegraAlertaUsuario[]> {
    return new Promise((resolve, reject) => {
      this.regraAlertaUsuarioRepository.save(regraAlertaUsuario).then(novasRegrasAlertaUsuario => {
        resolve(novasRegrasAlertaUsuario);
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public listar(usr_id: number, esc_id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const campos = [
        'rau.rau_id_int as rau_id', 'rau.ral_id_int as ral_id',
        'rau.usr_id_int as usr_id', 'rau.esc_id_int as esc_id'
      ];
      this.regraAlertaUsuarioRepository.createQueryBuilder('rau')
        .select(campos)
        .where('rau.usr_id_int = :usr_id', { usr_id: usr_id })
        .andWhere('rau.esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then(regrasAlertas => {
          console.log(regrasAlertas);
          resolve(regrasAlertas);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public excluir(dados: any[]): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      console.clear();
      let contaDeletados = 0;
      dados.forEach(dado => {
        this.regraAlertaUsuarioRepository.createQueryBuilder('rau')
          .delete()
          .where('ral_id_int = :ral_id', { ral_id: dado['ral_id'] })
          .andWhere('usr_id_int = :usr_id', { usr_id: dado['usr_id'] })
          .andWhere('esc_id_int = :esc_id', { esc_id: dado['esc_id'] })
          .execute()
          .then(deleteResult => {
            contaDeletados++;
            if (contaDeletados == dados.length) {
              resolve(deleteResult);
            }
          }).catch(reason => {
            reject(reason)
          });
      });
      resolve(null);
    })
  }

}
