import { EtapaEnsino } from './../etapa-ensino/etapa-ensino.entity';
import { EtapaEnsinoService } from './../etapa-ensino/etapa-ensino.service';
import { SerieRepository } from './serie.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Serie } from './serie.entity';
import { DeleteResult, createQueryBuilder, getRepository } from 'typeorm';
import { SerieEtapaDto } from './dto/serie-etapa.dto';

@Injectable()
export class SerieService {
  constructor(
    @InjectRepository(SerieRepository) private serieRepository: SerieRepository,
    private etapaEnsinoService: EtapaEnsinoService
  ) { }

  /**
   * Insere nova série
   * @param serie
   */
  public inserirSerie(serie: Serie): Promise<Serie> {
    return new Promise((resolve, reject) => {
      this.verificarExistenciaSerieNomeEtapa(serie).then((existe: boolean) => {
        if (!existe) {
          this.serieRepository.save(serie).then((serie: Serie) => {
            resolve(serie);
          }).catch((reason: any) => {
            reject(reason);
          });
        } else {
          resolve(null);
        }
      });
    });
  }

  /**
   * Insere registros de série da integração
   * @param series
   */
  public inserirSerieIntegracao(series: Serie[]): Promise<Serie[]> {
    return new Promise((resolve, reject) => {
      let contaSeriesInseridas = 0;
      let arraySeriesInseridas = new Array<Serie>();
      series.forEach((serie: Serie) => {
        this.verificarExistenciaIntegracao(serie).then((existe: boolean) => {
          contaSeriesInseridas++
          if (!existe) {
            const queryString = 'insert into serie_sre (sre_id_int, sre_nome_txt,sre_abreviatura_txt,ete_id_int) values ($1, $2, $3, $4)'
            this.serieRepository.query(queryString,
              [serie.id, serie.nome, serie.abreviatura, serie.ete_id])
              .then(() => {
                arraySeriesInseridas.push(serie);
                if (contaSeriesInseridas == series.length) {
                  resolve(arraySeriesInseridas);
                }
              })
          } else {
            resolve(null)
          }
        }).catch((reason: any) => {
          reject(reason);
        });
      });
    });
  }

  /**
   * Lista todas as séries com os dados da etapa associada
   */
  public listarSeries(): Promise<SerieEtapaDto[]> {
    return new Promise((resolve, reject) => {
      this.serieRepository.createQueryBuilder('sre')
        .select(
          ['sre_id_int as id, ' +
            'sre_nome_txt as nome,  ' +
            'sre_abreviatura_txt as abreviatura, ' +
            'sre.ete_id_int as ete_id, ' +
            'ete_nome_txt as ete_nome, ' +
            'ete_abreviatura_txt as ete_abreviatura'
          ]
        )
        .innerJoin('sre.etapaEnsino', 'etapaEnsino')
        .getRawMany()
        .then((seriesEtapasDto: SerieEtapaDto[]) => {
          resolve(seriesEtapasDto);
        }).catch((reason: any) => {
          reject(reason);
        });
    });
  }

  /**
   * Altera série
   * @param serie
   */
  public alterarSerie(serie: Serie): Promise<Serie> {
    return new Promise((resolve, reject) => {
      this.verificarExistenciaSerieNomeEtapa(serie).then((existe: boolean) => {
        if (!existe) {
          this.serieRepository.save(serie).then((serie: Serie) => {
            resolve(serie);
          }).catch((reason: any) => {
            reject(reason);
          });
        } else {
          resolve(null);
        }
      });
    });
  }

  /**
   * Excluir série
   * @param id
   */
  public excluirSerie(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.serieRepository.delete(id).then((deleteResult: DeleteResult) => {
        resolve(deleteResult);
      }).catch((reason: any) => {
        reject(reason);
      })
    });
  }

  /**
   * Verifica se já existe série com nome e etapa do ensino
   * @param serie
   */
  public verificarExistenciaSerieNomeEtapa(serie: Serie): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.serieRepository.find({ where: { nome: serie.nome, ete_id: serie.ete_id } }).then((series: Serie[]) => {
        if (series.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public verificarExistenciaIntegracao(serie: Serie): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.serieRepository.findByIds([serie.id]).then((series: Serie[]) => {
        if (series.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }


}
