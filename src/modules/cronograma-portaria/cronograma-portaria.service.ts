import { CronogramaPortaria } from './cronograma-portaria.entity';
import { CronogramaPortariaRepository } from './cronograma-portaria.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CronogramaPortariaService {
  constructor(@InjectRepository(CronogramaPortariaRepository) private cronogramaPortariaRepository: CronogramaPortariaRepository) { }

  public inserir(dadosCronograma: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const cronogramaPortaria = new CronogramaPortaria();
      cronogramaPortaria.por_id = parseInt(dadosCronograma['porId']);
      cronogramaPortaria.horario_inicio = dadosCronograma['horarioInicio'];
      cronogramaPortaria.horario_fim = dadosCronograma['horarioFim'];
      cronogramaPortaria.modo_portaria = dadosCronograma['modoPortaria'];
      this.cronogramaPortariaRepository.save(cronogramaPortaria).then(() => {
        resolve();
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public listar(por_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'crp.crp_id_int as crp_id', 'crp.crp_horario_inicio_tmr as horario_inicio',
        'crp.crp_horario_fim_tmr as horario_fim', 'crp.crp_modo_portaria_txt as modo_portaria',
        'por.por_codigo_cadastro_txt as codigo_portaria'
      ];
      this.cronogramaPortariaRepository.createQueryBuilder('crp')
        .select(campos)
        .innerJoin('crp.portaria', 'por')
        .where('crp.por_id_int = :por_id', { por_id: por_id })
        .execute()
        .then(cronogramas => {
          resolve(cronogramas);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public excluir(crp_id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const id = crp_id['crp_id']
      this.cronogramaPortariaRepository.delete(id).then(() => {
        resolve();
      }).catch(reason => {
        reject(reason);
      });
    })
  }
}
