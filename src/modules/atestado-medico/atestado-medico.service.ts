import { AtestadoMedico } from './atestado-medico.entity';
import { AtestadoMedicoRepository } from './atestado-medico.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AtestadoMedicoDto } from './dto/atestado-medico.dto';
import * as moment from 'moment';
import { DeleteResult } from 'typeorm';

@Injectable()
export class AtestadoMedicoService {
  constructor(@InjectRepository(AtestadoMedicoRepository) private atestadoMedicoRepository: AtestadoMedicoRepository) { }

  public inserir(atestadoMedicoDto: AtestadoMedicoDto): Promise<any> {
    return new Promise((resolve, reject) => {
      const atestadoMedico = new AtestadoMedico();
      atestadoMedico.codigo_cid = atestadoMedicoDto.atm_codigo_cid;
      atestadoMedico.data_fim = new Date(atestadoMedicoDto.atm_data_fim + ' 00:00:00');
      atestadoMedico.data_inicio = new Date(atestadoMedicoDto.atm_data_inicio + ' 00:00:00');
      atestadoMedico.descricao_cid = atestadoMedicoDto.atm_descricao_cid;
      atestadoMedico.codigo_cid = atestadoMedicoDto.atm_codigo_cid;
      atestadoMedico.est_id = atestadoMedicoDto.est_id;
      atestadoMedico.quantidade_dias_letivos = atestadoMedicoDto.atm_quantidade_dias_letivos
      atestadoMedico.usr_id = atestadoMedicoDto.usr_id;
      this.atestadoMedicoRepository.save(atestadoMedico).then(novoAtestadoMedico => {
        resolve(novoAtestadoMedico);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public listar(nomeEstudante: string, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'atm.atm_id_int as atm_id', 'atm.atm_codigo_cid_txt as codigo_cid',
        'atm.atm_descricao_cid_txt as descricao_cid', 'atm.atm_data_inicio_dtm as data_inicio',
        'atm.atm_data_fim_dtm as data_fim', 'est.est_id_int as est_id',
        'est.est_nome_txt as estudante', 'usr.usr_id_int as usr_id',
        'usr.usr_nome_txt as usuario', 'atm.atm_quantidade_dias_letivos_int as dias_letivos'
      ];
      this.atestadoMedicoRepository.createQueryBuilder('atm')
        .select(campos)
        .innerJoin('atm.estudante', 'est')
        .innerJoin('atm.usuario', 'usr')
        .innerJoin('est.escola', 'esc')
        .where('LOWER(est.est_nome_txt) like LOWER(:nomeEstudante)', { nomeEstudante: `%${nomeEstudante}%` })
        .andWhere('est.esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then((atestados: any[]) => {
          atestados = atestados.map(atestado => {
            atestado['data_inicio'] = moment(atestado['data_inicio']).format('yyyy-MM-DD');
            atestado['data_fim'] = moment(atestado['data_fim']).format('yyyy-MM-DD');
            return atestado;
          });
          resolve(atestados);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public alterar(atestadoMedicoDto: AtestadoMedicoDto): Promise<any> {
    return new Promise((resolve, reject) => {
      const atestadoMedico = new AtestadoMedico();
      atestadoMedico.id = atestadoMedicoDto.atm_id;
      atestadoMedico.codigo_cid = atestadoMedicoDto.atm_codigo_cid;
      atestadoMedico.data_fim = atestadoMedicoDto.atm_data_fim;
      atestadoMedico.data_inicio = atestadoMedicoDto.atm_data_inicio;
      atestadoMedico.descricao_cid = atestadoMedicoDto.atm_descricao_cid;
      atestadoMedico.codigo_cid = atestadoMedicoDto.atm_codigo_cid;
      atestadoMedico.est_id = atestadoMedicoDto.est_id;
      atestadoMedico.quantidade_dias_letivos = atestadoMedicoDto.atm_quantidade_dias_letivos
      atestadoMedico.usr_id = atestadoMedicoDto.usr_id;
      this.atestadoMedicoRepository.save(atestadoMedico).then(novoAtestadoMedico => {
        resolve(novoAtestadoMedico);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public excluir(atm_id: any): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      const id = atm_id['atm_id'];
      this.atestadoMedicoRepository.delete(id).then(deleteResult => {
        resolve(deleteResult);
      }).catch(reason => {
        reject(reason);
      });
    });
  }


}

