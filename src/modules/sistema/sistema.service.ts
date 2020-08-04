import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';

@Injectable()
export class SistemaService {


  public listarCampos(tabela: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tabela}'`;
      getManager().query(query).then(campos => {
        const camposFiltrados = campos.map((campo: any) => {
          return {
            Field: campo.column_name,
            Type: campo.data_type,
            Null: campo.is_nullable, Default: campo.column_default
          }
        })
        resolve(camposFiltrados);
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public listarCamposTabela(campos: string, esc_id: number, ordem: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const from = `from estudante_est as est ` +
        `natural join estudante_turma_etu as etu ` +
        `natural join turma_trm as trm ` +
        `natural join serie_sre as sre ` +
        `natural join turno_trn as trn ` +
        `natural join etapa_ensino_ete ` +
        `where etu.etu_turma_atual_int = 1 and est.esc_id_int = ${esc_id} order by ${ordem}`
      const query = `select distinct ${campos} ${from}`
      getManager().query(query).then(resultados => {
        resolve(resultados);
      }).catch(reason => {
        reject(reason);
      });
    })
  }

}
