import { StatusEntregaMensagem } from './../status-entrega-mensagem/status-entrega-mensagem.entity';
import { ComunicadoDiverso } from './comunicado-diverso.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComunicadoDiversoRepository } from './comunicado-diverso.repository';
import { ComunicadoDiversoDto } from './dto/comunicado-diverso.dto';

@Injectable()
export class ComunicadoDiversoService {
  constructor(@InjectRepository(ComunicadoDiversoRepository) private comunicadoDiversoRepository: ComunicadoDiversoRepository) { }

  public inserir(dados: ComunicadoDiversoDto): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('comunicado-diverso => inserir', dados);
      resolve([]);
    })
  }

  public inserirMultiplos(dados: ComunicadoDiversoDto[]): Promise<void> {
    return new Promise((resolve, reject) => {
      let comunicadosDiversos = dados.map(comunicadoDiversoDto => {
        const comunicadoDiverso = new ComunicadoDiverso();
        comunicadoDiverso.id = null;
        comunicadoDiverso.assunto = comunicadoDiversoDto.assunto;
        comunicadoDiverso.data = <Date><unknown>(comunicadoDiversoDto.data_comunicado.toString() + ' ' + comunicadoDiversoDto.hora.toString());
        comunicadoDiverso.fbdbkey = comunicadoDiversoDto.fbdbkey;
        comunicadoDiverso.hora = <Date><unknown>(comunicadoDiversoDto.data_comunicado.toString() + ' ' + comunicadoDiversoDto.hora.toString());
        comunicadoDiverso.mensagem = comunicadoDiversoDto.mensagem;
        comunicadoDiverso.cdi_status = comunicadoDiversoDto.status_comunicado;
        comunicadoDiverso.usr_id = comunicadoDiversoDto.usr_id;
        comunicadoDiverso.est_id = comunicadoDiversoDto.est_id;
        return comunicadoDiverso;
      })
      this.comunicadoDiversoRepository.save(comunicadosDiversos).then(novosComunicadosDiversos => {
        resolve();
      }).catch(reason => {
        resolve(reason);
      });
    });
  }

  public inserirSimples(dados: ComunicadoDiversoDto): Promise<any> {
    return new Promise((resolve, reject) => {
      const comunicadoDiverso = new ComunicadoDiverso();
      comunicadoDiverso.assunto = dados.assunto;
      comunicadoDiverso.cdi_status = dados.status_comunicado;
      comunicadoDiverso.data = dados.data_comunicado;
      comunicadoDiverso.est_id = dados.est_id;
      comunicadoDiverso.fbdbkey = dados.fbdbkey;
      comunicadoDiverso.hora = new Date(dados.data_comunicado.toString() + ' ' + dados.hora);
      comunicadoDiverso.mensagem = dados.mensagem;
      comunicadoDiverso.usr_id = dados.usr_id;
      this.comunicadoDiversoRepository.save(comunicadoDiverso).then(novoComunicado => {
        resolve(novoComunicado)
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public filtrar(status: number, data_inicio: Date, data_fim: Date, limit: number, offset: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (status >= 0) {
        this.filtrarPorStatus(status, data_inicio, data_fim, limit, offset, esc_id).then((comunicados: any[]) => {
          resolve(comunicados)
        }).catch(reason => {
          reject(reason);
        })
      } else {
        this.filtrarTodos(data_inicio, data_fim, limit, offset, esc_id).then((comunicados: any[]) => {
          resolve(comunicados);
        }).catch(reason => {
          reject(reason);
        });
      }
    })
  }

  public filtrarTodos(data_inicio: Date, data_fim: Date, limit: number, offset: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'cdi_id_int as id', 'cdi.est_id_int as est_id',
        'est.est_nome_txt as nome', 'sre.sre_abreviatura_txt as serie',
        'ete.ete_abreviatura_txt as etapa', 'trm.trm_nome_txt as turma',
        'trn.trn_nome_txt as turno', 'cdi.cdi_assunto_txt as assunto',
        'cdi.cdi_mensagem_txt as mensagem', 'cdi.cdi_data_dte as data_comunicado',
        'cdi.cdi_hora_tmr as hora', 'cdi.cdi_status_int as status_comunicado',
        'cdi.cdi_fbdbkey_txt as fbdbkey', 'cdi.usr_id_int as usr_id',
        'usr.usr_nome_txt as usuario', '0 as total'
      ];
      this.comunicadoDiversoRepository.createQueryBuilder('cdi').select(campos)
        .innerJoin('cdi.usuario', 'usr')
        .innerJoin('cdi.estudante', 'est')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .innerJoin('trm.turno', 'trn')
        .innerJoin('trm.serie', 'sre')
        .innerJoin('sre.etapaEnsino', 'ete')
        .innerJoin('est.escola', 'esc')
        .where('est.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('date(cdi.cdi_data_dte) >= date(:data_inicio)', { data_inicio: data_inicio })
        .andWhere('date(cdi.cdi_data_dte) <= date(:data_fim)', { data_fim: data_fim })
        .limit(limit)
        .offset(offset)
        .execute()
        .then((comunicados: any[]) => {
          comunicados = comunicados.map(comunicado => {
            comunicado['total'] = comunicados.length;
            return (comunicado);
          })
          resolve(comunicados);
        }).catch(reason => {
          reject(reason)
        });
    })
  }

  public filtrarPorStatus(status: number, data_inicio: Date, data_fim: Date, limit: number, offset: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'cdi_id_int as id', 'cdi.est_id_int as est_id',
        'est.est_nome_txt as nome', 'sre.sre_abreviatura_txt as serie',
        'ete.ete_abreviatura_txt as etapa', 'trm.trm_nome_txt as turma',
        'trn.trn_nome_txt as turno', 'cdi.cdi_assunto_txt as assunto',
        'cdi.cdi_mensagem_txt as mensagem', 'cdi.cdi_data_dte as data_comunicado',
        'cdi.cdi_hora_tmr as hora', 'cdi.cdi_status_int as status_comunicado',
        'cdi.cdi_fbdbkey_txt as fbdbkey', 'cdi.usr_id_int as usr_id',
        'usr.usr_nome_txt as usuario', '0 as total'
      ];
      this.comunicadoDiversoRepository.createQueryBuilder('cdi').select(campos)
        .innerJoin('cdi.usuario', 'usr')
        .innerJoin('cdi.estudante', 'est')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .innerJoin('trm.turno', 'trn')
        .innerJoin('trm.serie', 'sre')
        .innerJoin('sre.etapaEnsino', 'ete')
        .innerJoin('est.escola', 'esc')
        .where('est.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('date(cdi.cdi_data_dte) >= date(:data_inicio)', { data_inicio: data_inicio })
        .andWhere('date(cdi.cdi_data_dte) <= date(:data_fim)', { data_fim: data_fim })
        .andWhere('cdi.cdi_status_int = :status', { status: status })
        .limit(limit)
        .offset(offset)
        .execute()
        .then((comunicados: any[]) => {
          comunicados = comunicados.map(comunicado => {
            comunicado['total'] = comunicados.length;
            return (comunicado);
          })
          resolve(comunicados);
        }).catch(reason => {
          reject(reason)
        });
    })
  }

  public alterarStatusEntregaMensagem(dados: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      let contaAtualizados = 0;
      if (dados.length == 0) {
        resolve();
      }
      dados.forEach((dado: any) => {
        const fbdbkey = dado['fbdbkey'];
        const status_leitura = dado['status_leitura'];
        this.comunicadoDiversoRepository.createQueryBuilder('cdi')
          .update()
          .set({ cdi_status: status_leitura })
          .where('cdi_fbdbkey_txt = :fbdbkey', { fbdbkey: fbdbkey })
          .execute()
          .then((updateResult) => {
            contaAtualizados++;
            if (contaAtualizados == dados.length) {
              resolve();
            }
          }).catch(reason => {
            reject(reason)
          });
      });
    })
  }

}
