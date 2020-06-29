import { SaidaAntecipadaEventual } from './saida-antecipada-eventual.entity';
import { SaidaAntecipadaEventualRepository } from './saida-antecipada-eventual.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SaidaAntecipadaEventualService {
  constructor(@InjectRepository(SaidaAntecipadaEventualRepository) private saidaAntecipadaEventualRepository: SaidaAntecipadaEventualRepository) { }

  public inserir(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const arrayDeEstudantesIds = <number[]>dados['arrayOfEstId'];
      const data = dados['data'];
      const hora = dados['hora'];
      const motivo = dados['motivo'];
      const usrId = dados['usr_id'];
      const saidasAntecipadasEventuais = new Array<SaidaAntecipadaEventual>();
      arrayDeEstudantesIds.forEach(est_id => {
        const saidaAntecipadaEventual = new SaidaAntecipadaEventual();
        saidaAntecipadaEventual.est_id = est_id;
        saidaAntecipadaEventual.data = new Date(data + ' 00:00:00');
        saidaAntecipadaEventual.hora = hora;
        saidaAntecipadaEventual.motivo = motivo;
        saidaAntecipadaEventual.usr_id = usrId;
        saidasAntecipadasEventuais.push(saidaAntecipadaEventual);
      });
      this.saidaAntecipadaEventualRepository.save(saidasAntecipadasEventuais).then(() => {
        resolve();
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public listarPorEstudanteId(est_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'sae.sae_id_int as sae_id', 'sae.sae_data_dte as data',
        'sae.sae_hora_tmr as hora', 'sae.sae_motivo_txt as motivo',
        'usr.usr_id_int as usr_id', 'usr.usr_nome_txt as usuario_responsavel'
      ];
      this.saidaAntecipadaEventualRepository.createQueryBuilder('sae')
        .select(campos)
        .innerJoin('sae.usuario', 'usr')
        .where('sae.est_id_int = :est_id', { est_id: est_id })
        .execute()
        .then(saidasAntecipadas => {
          resolve(saidasAntecipadas);
        }).catch(reason => {
          reject(reason);
        })
    })
  }


  public filtrar(limite: number, offset: number, valor: string, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {


      this.totalFiltroSaidaAntecipadaEventual(valor, esc_id).then(total => {
        const campos = [
          'sae.sae_id_int as id', 'est.est_id_int as est_id',
          'est.est_nome_txt as nome', 'sre.sre_id_int as sre_id',
          'sre.sre_abreviatura_txt as serie', 'ete.ete_id_int as ete_id',
          'ete.ete_abreviatura_txt as etapa', 'trm.trm_id_int as trm_id',
          'trm.trm_nome_txt as turma', 'trn.trn_id_int as trn_id',
          'trn.trn_nome_txt as turno', 'sae.sae_data_dte as data',
          'sae.sae_hora_tmr as hora', 'sae.sae_motivo_txt as motivo',
          'usr.usr_id_int as usr_id', 'usr.usr_nome_txt as usuario',
          'est.est_foto_txt as foto', 'est.est_matricula_txt as matricula',
          `${total} as total`
        ];
        this.saidaAntecipadaEventualRepository.createQueryBuilder('sae')
          .select(campos)
          .innerJoin('sae.estudante', 'est')
          .innerJoin('est.estudantesTurmas', 'etu')
          .innerJoin('etu.turma', 'trm')
          .innerJoin('trm.turno', 'trn')
          .innerJoin('trm.serie', 'sre')
          .innerJoin('sre.etapaEnsino', 'ete')
          .innerJoin('sae.usuario', 'usr')
          .where('LOWER(est.est_nome_txt) like LOWER(:valor)', { valor: `%${valor}%` })
          .andWhere('est.esc_id_int = :esc_id', { esc_id: esc_id })
          .limit(limite)
          .offset(offset)
          .execute()
          .then(saidasAntecipadasEventuais => {
            resolve(saidasAntecipadasEventuais);
          }).catch(reason => {
            reject(reason);
          });
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public totalFiltroSaidaAntecipadaEventual(valor: string, esc_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.saidaAntecipadaEventualRepository.createQueryBuilder('sae')
        .innerJoin('sae.estudante', 'est')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .innerJoin('trm.turno', 'trn')
        .innerJoin('trm.serie', 'sre')
        .innerJoin('sre.etapaEnsino', 'ete')
        .innerJoin('sae.usuario', 'usr')
        .where('LOWER(est.est_nome_txt) like LOWER(:valor)', { valor: `%${valor}%` })
        .andWhere('est.esc_id_int = :esc_id', { esc_id: esc_id })
        .getCount().then(total => {
          resolve(total);
        }).catch(reason => {
          reject(reason);
        });
    });
  }


  public excluir(sae_id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(sae_id);
      resolve();
    })
  }

}
