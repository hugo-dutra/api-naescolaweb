import { Injectable } from '@nestjs/common';
import { ResultadoBoletimRepository } from './resultado-boletim.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultadoBoletim } from './resultado-boletim.entity';

@Injectable()
export class ResultadoBoletimService {
  constructor(@InjectRepository(ResultadoBoletimRepository) private resultadoBoletimRepository: ResultadoBoletimRepository) { }

  public inserir(resultadosConsolidados: ResultadoBoletim[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const resultadosBoletins = new Array<any>();
      resultadosConsolidados.forEach(resultadoConsolidado => {
        const resultado = new ResultadoBoletim();
        resultado.bes_id = resultadoConsolidado['bes_id'];
        resultado.dsp_id = resultadoConsolidado['dsp_id'];
        resultado.prl_id = resultadoConsolidado['prl_id'];
        resultado.falta = resultadoConsolidado['reb_falta'];
        resultado.nota = resultadoConsolidado['reb_nota'];
        this.verificarExistencia(resultado).then(resultadoEncontrado => {
          if (resultadoEncontrado) {
            resultado.id = resultadoEncontrado.id;
            resultadosBoletins.push(resultado);
          } else {
            resultadosBoletins.push(resultado);
          }
          if (resultadosBoletins.length == resultadosConsolidados.length) {
            this.resultadoBoletimRepository.save(resultadosBoletins).then(() => {
              console.log(resultadosBoletins);
              resolve();
            })
          }
        })
      })
    })
  }

  public verificarExistencia(resultadoBoletim: ResultadoBoletim): Promise<ResultadoBoletim> {
    return new Promise((resolve, reject) => {
      this.resultadoBoletimRepository.findOne(
        {
          where: {
            bes_id: resultadoBoletim.bes_id,
            dsp_id: resultadoBoletim.dsp_id,
            prl_id: resultadoBoletim.prl_id
          }
        }).then(resultadoBoletimEncontrado => {
          resolve(resultadoBoletimEncontrado)
        }).catch(reason => {
          reject(reason)
        })
    })
  }
}
