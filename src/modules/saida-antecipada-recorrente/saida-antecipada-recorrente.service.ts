import { SaidaAntecipadaRecorrente } from './saida-antecipada-recorrente.entity';
import { SaidaAntecipadaRecorrenteRepository } from './saida-antecipada-recorrente.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SaidaAntecipadaRecorrenteService {
  constructor(@InjectRepository(SaidaAntecipadaRecorrenteRepository) private saidaAntecipadaRecorrenteRepository: SaidaAntecipadaRecorrenteRepository) { }

  public inserirAlterar(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const arrayOfEstId = <number[]>dados['arrayOfEstId'];
      if (arrayOfEstId.length == 0) {
        resolve();
      }
      const data = new Date(dados['data'] + ' 00:00:00');
      const hora = dados['hora'];
      const motivo = dados['motivo'];
      const usr_id = dados['usr_id'];
      const segunda = dados['segunda'];
      const terca = dados['terca'];
      const quarta = dados['quarta'];
      const quinta = dados['quinta'];
      const sexta = dados['sexta'];
      const sabado = dados['sabado'];
      const arrayDeSaidasAntecipadasRecorrentes = new Array<SaidaAntecipadaRecorrente>();
      let contaVerificados = 0;
      arrayOfEstId.forEach(est_id => {
        this.verificarExistencia(est_id).then(saidaAntecipadaRecorrenteProcurada => {
          contaVerificados++;
          const saidaAntecipadaRecorrente = new SaidaAntecipadaRecorrente();
          saidaAntecipadaRecorrente.data = data;
          saidaAntecipadaRecorrente.hora = hora;
          saidaAntecipadaRecorrente.motivo = motivo;
          saidaAntecipadaRecorrente.usr_id = usr_id;
          saidaAntecipadaRecorrente.segunda = segunda;
          saidaAntecipadaRecorrente.terca = terca;
          saidaAntecipadaRecorrente.quarta = quarta;
          saidaAntecipadaRecorrente.quinta = quinta;
          saidaAntecipadaRecorrente.sexta = sexta;
          saidaAntecipadaRecorrente.sabado = sabado;
          saidaAntecipadaRecorrente.est_id = est_id;
          if (!saidaAntecipadaRecorrenteProcurada) {
            saidaAntecipadaRecorrente.id = null;
            arrayDeSaidasAntecipadasRecorrentes.push(saidaAntecipadaRecorrente);

          } else {
            saidaAntecipadaRecorrente.id = saidaAntecipadaRecorrenteProcurada.id;
            arrayDeSaidasAntecipadasRecorrentes.push(saidaAntecipadaRecorrente);
          }
          if (contaVerificados == arrayOfEstId.length) {
            this.saidaAntecipadaRecorrenteRepository.save(arrayDeSaidasAntecipadasRecorrentes).then(() => {
              resolve();
            }).catch(reason => {
              reject(reason);
            });
          }
        }).catch(reason => {
          reject(reason);
        });
      });
    })
  }

  public verificarExistencia(est_id: number): Promise<SaidaAntecipadaRecorrente> {
    return new Promise((resolve, reject) => {
      this.saidaAntecipadaRecorrenteRepository.findOne({ where: { est_id: est_id } }).then(saidaAntecipadaRecorrente => {
        resolve(saidaAntecipadaRecorrente);
      }).catch(reason => {
        reject(reason);
      });
    })
  }

}
