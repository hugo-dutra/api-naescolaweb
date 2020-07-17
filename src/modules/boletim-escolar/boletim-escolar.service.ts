import { ResultadoBoletim } from './../resultado-boletim/resultado-boletim.entity';
import { BoletimEscolar } from './boletim-escolar.entity';
import { ResultadoBoletimRepository } from './../resultado-boletim/resultado-boletim.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoletimEscolaRepository } from './boletim-escolar.repository';

@Injectable()
export class BoletimEscolarService {
  constructor(
    @InjectRepository(BoletimEscolaRepository) private boletimEscolaRepository: BoletimEscolaRepository,
    @InjectRepository(ResultadoBoletimRepository) private resultadoBoletimRepository: ResultadoBoletimRepository,
  ) { }

  public gravarNotasDePlanilha(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const prl_id = dados['prl_id'];
      const resultadosEstudantesTurma: any[] = dados['resultadosEstudante'];
      let resultadosInseridos = 0;
      resultadosEstudantesTurma.forEach((resultadosEstudante: any[]) => {
        const boletimEscolar = new BoletimEscolar();
        boletimEscolar.est_id = resultadosEstudante[0]['id'];
        boletimEscolar.ano = new Date().getFullYear();
        this.procurarBoletim(boletimEscolar).then(boletim => {
          const resultadosBoletim = new Array<ResultadoBoletim>();
          if (!boletim) {
            this.boletimEscolaRepository.save(boletimEscolar).then(novoBoletim => {
              resultadosEstudante.forEach(resultado => {
                const resultadoBoletim = new ResultadoBoletim();
                resultadoBoletim.bes_id = novoBoletim.id
                resultadoBoletim.dsp_id = resultado.dsp_id;
                resultadoBoletim.falta = resultado.faltas;
                resultadoBoletim.nota = resultado.nota;
                resultadoBoletim.prl_id = prl_id;
                resultadosBoletim.push(resultadoBoletim);
              })
              this.resultadoBoletimRepository.save(resultadosBoletim).then(() => {
                resultadosInseridos++;
                if (resultadosInseridos == resultadosEstudantesTurma.length) {
                  resolve();
                }
              }).catch(reason => {
                reject(reason)
              })
            }).catch(reason => {
              reject(reason)
            })
          } else {
            resultadosEstudante.forEach(resultadoEstudante => {
              const resultadoBoletim = new ResultadoBoletim();
              resultadoBoletim.bes_id = boletim.id;
              resultadoBoletim.dsp_id = resultadoEstudante.dsp_id;
              resultadoBoletim.falta = resultadoEstudante.faltas;
              resultadoBoletim.nota = resultadoEstudante.nota;
              resultadoBoletim.prl_id = prl_id;
              this.procurarResultadoBoletim(resultadoBoletim).then(result => {
                if (!result) {
                  resultadosBoletim.push(resultadoBoletim);
                } else {
                  resultadoBoletim.id = result.id;
                  resultadosBoletim.push(resultadoBoletim);
                }
                if (resultadosBoletim.length == resultadosEstudante.length) {
                  this.resultadoBoletimRepository.save(resultadosBoletim).then(() => {
                    resultadosInseridos++;
                    if (resultadosInseridos == resultadosEstudantesTurma.length) {
                      resolve();
                    }
                  }).catch(reason => {
                    reject(reason)
                  });
                }
              }).catch(reason => {
                reject(reason)
              });
            });
          }
        }).catch(reason => {
          reject(reason)
        })
      })
    })
  }

  public lancamentoPeriodoLetivoManual(dados: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      let contaNotasInseridas = 0;
      const arrayResultadosBoletins = new Array<ResultadoBoletim>()
      dados.forEach(dadoEstudante => {
        const boletimEscolar = new BoletimEscolar();
        boletimEscolar.est_id = dadoEstudante['est_id'];
        boletimEscolar.ano = dadoEstudante['anoAtual'];
        this.procurarBoletim(boletimEscolar).then(boletim => {
          contaNotasInseridas++;
          if (!boletim) {
            this.boletimEscolaRepository.save(boletimEscolar).then(novoBoletim => {
              const resultadoBoletim = new ResultadoBoletim();
              resultadoBoletim.bes_id = novoBoletim.id
              resultadoBoletim.dsp_id = dadoEstudante.dsp_id
              resultadoBoletim.falta = dadoEstudante.faltas;
              resultadoBoletim.nota = dadoEstudante.nota;
              resultadoBoletim.prl_id = dadoEstudante.prl_id
              arrayResultadosBoletins.push(resultadoBoletim)
            })
          } else {
            const resultadoBoletim = new ResultadoBoletim();
            resultadoBoletim.bes_id = boletim.id;
            resultadoBoletim.dsp_id = dadoEstudante.dsp_id;
            resultadoBoletim.falta = dadoEstudante.faltas;
            resultadoBoletim.nota = dadoEstudante.nota;
            resultadoBoletim.prl_id = dadoEstudante.prl_id;
            arrayResultadosBoletins.push(resultadoBoletim)
          }
          if (contaNotasInseridas == dados.length) {
            this.resultadoBoletimRepository.save(arrayResultadosBoletins).then(() => {
              resolve();
            }).catch(reason => {
              reject(reason);
            })
          }

        })
      })
    })
  }


  public procurarResultadoBoletim(resultadoBoletim: ResultadoBoletim): Promise<ResultadoBoletim> {
    return new Promise((resolve, reject) => {
      this.resultadoBoletimRepository
        .find({
          where:
          {
            bes_id: resultadoBoletim.bes_id,
            dsp_id: resultadoBoletim.dsp_id,
            prl_id: resultadoBoletim.prl_id
          }
        })
        .then((resultados: ResultadoBoletim[]) => {
          if (resultados.length != 0) {
            resolve(resultados[0])
          } else {
            resolve(null)
          }
        })
    })
  }

  public inserirBoletinsEscola(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const anoLetivo: number = dados['ano_letivo'];
      const dadosEstudantes: any[] = dados['arrayOfEstudantes'];
      let boletinsInseridos = 0;
      dadosEstudantes.forEach(dado => {
        const boletimEscolar = new BoletimEscolar();
        boletimEscolar.ano = anoLetivo;
        boletimEscolar.est_id = dado['id'];
        boletimEscolar.est_matricula = dado['matricula'];
        this.procurarBoletim(boletimEscolar).then(boletim => {
          if (!boletim) {
            this.boletimEscolaRepository.save(boletimEscolar).then(novoBoletim => {
              boletinsInseridos++;
              if (dadosEstudantes.length == boletinsInseridos) {
                resolve();
              }
            }).catch(reason => {
              reject(reason);
            });
          } else {
            boletinsInseridos++;
            if (dadosEstudantes.length == boletinsInseridos) {
              resolve();
            }
          }
        }).catch(reason => {
          reject(reason);
        });
      })
    })
  }

  public procurarBoletim(boletimEscolar: BoletimEscolar): Promise<BoletimEscolar> {
    return new Promise((resolve, reject) => [
      this.boletimEscolaRepository.find({ where: { ano: boletimEscolar.ano, est_id: boletimEscolar.est_id } }).then((boletins) => {
        if (boletins.length != 0) {
          resolve(boletins[0])
        } else {
          resolve(null)
        }
      })
    ])
  }



}
