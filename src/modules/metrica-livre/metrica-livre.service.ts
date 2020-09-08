import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetricaLivreRepository } from './metrica-livre.repository';
import { MetricaLivreDto } from './dto/metrica-livre.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class MetricaLivreService {

  constructor(@InjectRepository(MetricaLivreRepository) private metricaLivreRepository: MetricaLivreRepository) { }

  public inserir(metricaLivreDto: MetricaLivreDto): Promise<MetricaLivreDto> {
    return new Promise((resolve, reject) => {
      this.metricaLivreRepository.save(metricaLivreDto).then(novaMetricaLivreDto => {
        resolve(novaMetricaLivreDto);
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public listarPorEscolaId(escId: number): Promise<MetricaLivreDto[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'mtl_id_int as id',
        'mtl_nome_txt as nome',
        'mtl_abreviatura_txt as abreviatura',
        'mtl_reprova_bit as reprova',
        'esc_id_int as esc_id ',
        'mtl_ordem_num as ordem ']
      this.metricaLivreRepository
        .createQueryBuilder('mtl')
        .select(campos)
        .where('esc_id_int = :esc_id', { esc_id: escId })
        .execute()
        .then(metricasLivres => {
          resolve(metricasLivres);
        })
        .catch(reason => {
          reject(reason)
        })
    })
  }

  public alterar(metricaLivreDto: MetricaLivreDto): Promise<MetricaLivreDto> {
    return new Promise((resolve, reject) => {
      this.metricaLivreRepository.save(metricaLivreDto).then(novaMetricaLivreDto => {
        resolve(novaMetricaLivreDto);
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public excluir(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.metricaLivreRepository.delete(id).then(deleteResult => {
        resolve(deleteResult)
      }).catch(reason => {
        reject(reason)
      })
    })
  }


}
