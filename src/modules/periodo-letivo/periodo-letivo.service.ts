import { PeriodoLetivo } from './periodo-letivo.entity';
import { PeriodoLetivoRepository } from './periodo-letivo.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PeriodoLetivoService {
  constructor(@InjectRepository(PeriodoLetivoRepository) private periodoLetivoRepository: PeriodoLetivoRepository) { }

  public inserir(dadoPeriodo: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const periodoLetivo = new PeriodoLetivo();
      periodoLetivo.periodo = dadoPeriodo['periodo'];
      periodoLetivo.inicio = new Date(dadoPeriodo['inicio'] + ' 00:00:00');
      periodoLetivo.fim = new Date(dadoPeriodo['fim'] + ' 00:00:00');
      this.periodoLetivoRepository.save(periodoLetivo).then(() => {
        resolve()
      }).catch(reason => {
        reject(reason);
      })
    });
  }

  public listar(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'prl_id_int as id', 'prl_periodo_txt as periodo',
        'prl_inicio_dte as inicio', 'prl_fim_dte as fim'
      ];
      this.periodoLetivoRepository.createQueryBuilder('prl')
        .select(campos)
        .execute()
        .then(periodos => {
          resolve(periodos)
        }).catch(reason => {
          reject(reason)
        });
    });
  }

  public listarPorId(prl_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'prl_id_int as prl_id', 'prl_periodo_txt as periodo',
        'date(prl_inicio_dte) as inicio', 'date(prl_fim_dte)  as fim'
      ];
      this.periodoLetivoRepository.createQueryBuilder('prl')
        .select(campos)
        .where('prl_id_int = :prl_id', { prl_id: prl_id })
        .execute()
        .then(periodos => {
          resolve(periodos)
        }).catch(reason => {
          reject(reason)
        });
    });
  }

  public listarPorAno(ano: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'prl_id_int as id', 'prl_periodo_txt as periodo',
        'date(prl_inicio_dte) as inicio', 'date(prl_fim_dte)  as fim'
      ];
      this.periodoLetivoRepository.createQueryBuilder('prl')
        .select(campos)
        .where('extract(year from prl_inicio_dte) = :ano', { ano: ano })
        .andWhere('extract(year from prl_fim_dte) = :ano', { ano: ano })
        .execute()
        .then(periodos => {
          resolve(periodos)
        }).catch(reason => {
          reject(reason)
        });
    });
  }

  public alterar(dadoPeriodo: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const periodoLetivo = new PeriodoLetivo();
      periodoLetivo.id = dadoPeriodo['id']
      periodoLetivo.periodo = dadoPeriodo['periodo'];
      periodoLetivo.inicio = new Date(dadoPeriodo['inicio'] + ' 00:00:00');
      periodoLetivo.fim = new Date(dadoPeriodo['fim'] + ' 00:00:00');
      this.periodoLetivoRepository.save(periodoLetivo).then(() => {
        resolve()
      }).catch(reason => {
        reject(reason);
      })
    });
  }

  public excluir(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.periodoLetivoRepository.delete(id).then(() => {
        resolve();
      }).catch(reason => {
        reject(reason);
      })
    });
  }


}
