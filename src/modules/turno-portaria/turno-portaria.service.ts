import { TurnoPortaria } from './turno-portaria.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TurnoPortariaRepository } from './turno-portaria.repository';

@Injectable()
export class TurnoPortariaService {
  constructor(@InjectRepository(TurnoPortariaRepository) private turnoPortariaRepository: TurnoPortariaRepository) { }

  public inserir(dadosTurnoPortaria: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const turnosPortaria = new Array<TurnoPortaria>();
      dadosTurnoPortaria.forEach(dado => {
        const turnoPortaria = new TurnoPortaria();
        turnoPortaria.por_id = dado['por_id'];
        turnoPortaria.trn_id = dado['trn_id'];
        turnoPortaria.toleracia_inicio = dado['tolerancia_inicio'];
        turnoPortaria.toleracia_fim = dado['tolerancia_fim'];
        turnosPortaria.push(turnoPortaria);
      })
      this.turnoPortariaRepository.save(turnosPortaria).then(() => {
        resolve();
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public listar(por_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'tup.tup_id_int as tup_id', 'trn.trn_id_int as trn_id',
        'trn_nome_txt as turno', 'trn_hora_inicio_tmr as inicio',
        'trn_hora_fim_tmr as fim', 'por.por_id_int as por_id',
        'por.por_nome_txt as nome', 'tup.tup_tolerancia_inicio as tolerancia_inicio',
        'tup.tup_tolerancia_fim as tolerancia_fim'
      ];
      this.turnoPortariaRepository.createQueryBuilder('tup')
        .select(campos)
        .innerJoin('tup.turno', 'trn')
        .innerJoin('tup.portaria', 'por')
        .where('por.por_id_int = :por_id', { por_id: por_id })
        .execute()
        .then(turnosPortaria => {
          resolve(turnosPortaria);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public alterar(dadosTurnosPortaria: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const por_id = dadosTurnosPortaria[0]['por_id'];
      const turnosPortaria = new Array<TurnoPortaria>();
      this.excluirTurnoPortaria(por_id).then(() => {
        dadosTurnosPortaria.forEach(dadoTurnoPortaria => {
          const turnoPortaria = new TurnoPortaria();
          turnoPortaria.por_id = por_id;
          turnoPortaria.trn_id = dadoTurnoPortaria['trn_id'];
          turnoPortaria.toleracia_inicio = dadoTurnoPortaria['tolerancia_inicio'];
          turnoPortaria.toleracia_fim = dadoTurnoPortaria['tolerancia_fim'];
          turnosPortaria.push(turnoPortaria);
        });
        this.turnoPortariaRepository.save(turnosPortaria).then(() => {
          resolve();
        }).catch(reason => {
          reject(reason);
        });
      });
    })
  }

  private excluirTurnoPortaria(por_id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.turnoPortariaRepository.createQueryBuilder('tup')
        .delete()
        .where('por_id_int = :por_id', { por_id: por_id })
        .execute()
        .then(() => {
          resolve()
        }).catch(reason => {
          reject(reason)
        });
    })
  }

}
