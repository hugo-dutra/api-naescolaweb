import { EntradaPosteriorEstudante } from './entrada-posterior-estudante.entity';
import { EntradaPosteriorEstudanteRepository } from './entrada-posterior-estudante.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EntradaPosteriorEstudanteService {
  constructor(@InjectRepository(EntradaPosteriorEstudanteRepository) private entradaPosteriorEstudanteRepository: EntradaPosteriorEstudanteRepository) { }

  public inserir(dados: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      let contaInteracoes = 0;
      dados.forEach(dadoEntradaPosterior => {
        const entradaPosteriorEstudante = new EntradaPosteriorEstudante();
        entradaPosteriorEstudante.data = new Date(dadoEntradaPosterior['epe_data'] + ' 00:00:00');
        entradaPosteriorEstudante.esc_id = dadoEntradaPosterior['esc_id'];
        entradaPosteriorEstudante.est_id = dadoEntradaPosterior['est_id'];
        entradaPosteriorEstudante.hora = dadoEntradaPosterior['epe_hora'];
        entradaPosteriorEstudante.motivo = dadoEntradaPosterior['epe_motivo'];
        entradaPosteriorEstudante.quarta = dadoEntradaPosterior['epe_quarta'];
        entradaPosteriorEstudante.quinta = dadoEntradaPosterior['epe_quinta'];
        entradaPosteriorEstudante.sabado = dadoEntradaPosterior['epe_sabado'];
        entradaPosteriorEstudante.segunda = dadoEntradaPosterior['epe_segunda'];
        entradaPosteriorEstudante.sexta = dadoEntradaPosterior['epe_sexta'];
        entradaPosteriorEstudante.terca = dadoEntradaPosterior['epe_terca'];
        entradaPosteriorEstudante.usr_id = dadoEntradaPosterior['usr_id'];
        this.verificarExistencia(entradaPosteriorEstudante).then(existe => {
          contaInteracoes++;
          if (!existe) {
            this.entradaPosteriorEstudanteRepository.save(entradaPosteriorEstudante).then(() => {
              if (contaInteracoes == dados.length) {
                resolve()
              }
            })
          } else {
            this.entradaPosteriorEstudanteRepository.createQueryBuilder('epe').update()
              .set({
                data: entradaPosteriorEstudante.data,
                esc_id: entradaPosteriorEstudante.esc_id,
                est_id: entradaPosteriorEstudante.est_id,
                hora: entradaPosteriorEstudante.hora,
                motivo: entradaPosteriorEstudante.motivo,
                quarta: entradaPosteriorEstudante.quarta,
                quinta: entradaPosteriorEstudante.quinta,
                sabado: entradaPosteriorEstudante.sabado,
                segunda: entradaPosteriorEstudante.segunda,
                sexta: entradaPosteriorEstudante.sexta,
                terca: entradaPosteriorEstudante.terca,
                usr_id: entradaPosteriorEstudante.usr_id
              })
              .where('esc_id_int = :esc_id', { esc_id: entradaPosteriorEstudante.esc_id })
              .andWhere('est_id_int = :est_id', { est_id: entradaPosteriorEstudante.est_id })
              .execute().then(updateResult => {
                console.log(updateResult);
                if (contaInteracoes == dados.length) {
                  resolve()
                }
              }).catch(reason => {
                reject(reason);
              })
          }
        })
      })
    })
  }

  public listar(esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'epe.epe_id_int as epe_id', 'est.est_id_int as est_id',
        'est.est_nome_txt as nome', 'sre.sre_abreviatura_txt as serie',
        'trm.trm_nome_txt as turma', 'ete.ete_abreviatura_txt as etapa',
        'trn.trn_abreviatura_txt as turno', 'date(epe.epe_data_dte) as data',
        `epe.epe_hora_tmr as hora`, 'epe.epe_motivo_txt as motivo',
        'usr.usr_id_int as usr_id', 'epe.epe_segunda_int as segunda',
        'epe.epe_terca_int as terca', 'epe.epe_quarta_int as quarta',
        'epe.epe_quinta_int as quinta', 'epe.epe_sexta_int as sexta',
        'epe.epe_sabado_int as sabado', 'est.esc_id_int as esc_id'
      ];
      this.entradaPosteriorEstudanteRepository.createQueryBuilder('epe')
        .select(campos)
        .innerJoin('epe.estudante', 'est')
        .innerJoin('epe.usuario', 'usr')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .innerJoin('trm.serie', 'sre')
        .innerJoin('trm.turno', 'trn')
        .innerJoin('sre.etapaEnsino', 'ete')
        .where('est.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('etu.etu_turma_atual_int = 1')
        .orderBy('sre.sre_nome_txt', 'ASC')
        .orderBy('trm.trm_nome_txt', 'ASC')
        .orderBy('est.est_nome_txt', 'ASC')
        .execute()
        .then(entradasPosteriores => {
          resolve(entradasPosteriores);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public excluir(epe_id: any): Promise<void> {
    const id = epe_id['epe_id'];
    return new Promise((resolve, reject) => {
      this.entradaPosteriorEstudanteRepository.createQueryBuilder('epe')
        .delete()
        .where('epe_id_int = :epe_id', { epe_id: id })
        .execute()
        .then(deleteResult => {
          resolve();
        }).catch(reason => {
          reject(reason)
        })
    })
  }

  public verificarExistencia(entradaPosteriorEstudante: EntradaPosteriorEstudante): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.entradaPosteriorEstudanteRepository
        .find({ where: { est_id: entradaPosteriorEstudante.est_id, esc_id: entradaPosteriorEstudante.esc_id } })
        .then(entradasPosteriores => {
          if (entradasPosteriores.length != 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).catch(reason => {
          reject(reason);
        });
    })
  }

}
