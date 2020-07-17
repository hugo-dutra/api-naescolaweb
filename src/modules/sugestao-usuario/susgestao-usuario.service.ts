import { SugestaoUsuarioHistorico } from './../sugestao-usuario-historico/sugestao-usuario-historico.entity';
import { EscolaRepository } from './../escola/escola.repository';
import { SugestaoUsuario } from './sugestao-usuario.entity';
import { SugestaoUsuarioRepository } from './sugestao-usuario.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { escopo } from '../../utils/enums'
import { SugestaoUsuarioHistoricoRepository } from '../sugestao-usuario-historico/sugestao-usuario-historico.repository';

@Injectable()
export class SugestaoUsuarioService {
  constructor(
    @InjectRepository(SugestaoUsuarioRepository) private sugestaoUsuarioRepository: SugestaoUsuarioRepository,
    @InjectRepository(EscolaRepository) private escolaRepository: EscolaRepository,
    @InjectRepository(SugestaoUsuarioHistoricoRepository) private sugestaoUsuarioHistoricoRepository: SugestaoUsuarioHistoricoRepository,
  ) { }

  public inserir(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const sugestaoUsuario = new SugestaoUsuario();
      sugestaoUsuario.esc_id = dados['esc_id'];
      sugestaoUsuario.usr_id = dados['usr_id'];
      sugestaoUsuario.titulo = dados['titulo'];
      sugestaoUsuario.mensagem = dados['mensagem'];
      sugestaoUsuario.data_sugestao = new Date();
      sugestaoUsuario.tipo_sugestao = dados['tipoSugestao'];
      this.sugestaoUsuarioRepository.save(sugestaoUsuario).then(() => {
        resolve();
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public listar(data_inicio: Date, data_fim: Date, esc_id: number, escopoUsuario: string, statusSugestao: string): Promise<any[]> {
    if (escopoUsuario == escopo.GLOBAL) {
      return this.listarGlobal(data_inicio, data_fim, esc_id, statusSugestao);
    }
    if (escopoUsuario == escopo.REGIONAL) {
      return this.listarRegional(data_inicio, data_fim, esc_id, statusSugestao);
    }
    if (escopoUsuario == escopo.LOCAL) {
      return this.listarLocal(data_inicio, data_fim, esc_id, statusSugestao);
    }
  }

  public listarGlobal(data_inicio: Date, data_fim: Date, esc_id: number, statusSugestao: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'sus.sus_id_int as sus_id', 'usr.usr_nome_txt as usuario',
        'esc.esc_nome_txt as escola', 'sus.sus_titulo_txt as titulo',
        'sus.sus_mensagem_txt as mensagem', 'sus.sus_tipo_sugestao_txt as tipo',
        'sus.sus_data_sugestao_dte as data', 'sus.sus_status_sugestao_int as valor_status',
        '0 as status'
      ];
      this.sugestaoUsuarioRepository.createQueryBuilder('sus')
        .select(campos)
        .innerJoin('sus.usuario', 'usr')
        .innerJoin('sus.escola', 'esc')
        .where('date(sus_data_sugestao_dte) >= date(:data_inicio)', { data_inicio: data_inicio })
        .andWhere('date(sus_data_sugestao_dte) <= date(:data_fim)', { data_fim: data_fim })
        .andWhere('sus_status_sugestao_int = :statusSugestao', { statusSugestao: statusSugestao })
        .execute()
        .then((sugestoes: any[]) => {
          sugestoes = sugestoes.map(sugestao => {
            switch (sugestao['status']) {
              case 0:
                sugestao['status'] = 'novo'
                break;
              case 1:
                sugestao['status'] = 'pendente'
                break;
              case 2:
                sugestao['status'] = 'fechado'
                break;

              default:
                break;
            }
            return sugestao;
          });
          resolve(sugestoes);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public listarRegional(data_inicio: Date, data_fim: Date, esc_id: number, statusSugestao: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.createQueryBuilder()
        .select(['ree_id_int'])
        .where('esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then(ree_id_int => {
          const ree_id = ree_id_int[0]['ree_id_int'];
          const campos = [
            'sus.sus_id_int as sus_id', 'usr.usr_nome_txt as usuario',
            'esc.esc_nome_txt as escola', 'sus.sus_titulo_txt as titulo',
            'sus.sus_mensagem_txt as mensagem', 'sus.sus_tipo_sugestao_txt as tipo',
            'sus.sus_data_sugestao_dte as data', 'sus.sus_status_sugestao_int as valor_status',
            '0 as status'
          ];
          this.sugestaoUsuarioRepository.createQueryBuilder('sus')
            .select(campos)
            .innerJoin('sus.usuario', 'usr')
            .innerJoin('sus.escola', 'esc')
            .innerJoin('esc.regiaoEscola', 'ree')
            .where('date(sus_data_sugestao_dte) >= date(:data_inicio)', { data_inicio: data_inicio })
            .andWhere('date(sus_data_sugestao_dte) <= date(:data_fim)', { data_fim: data_fim })
            .andWhere('sus_status_sugestao_int = :statusSugestao', { statusSugestao: statusSugestao })
            .andWhere('ree.ree_id_int = :ree_id', { ree_id: ree_id })
            .execute()
            .then((sugestoes: any[]) => {
              sugestoes = sugestoes.map(sugestao => {
                switch (sugestao['status']) {
                  case 0:
                    sugestao['status'] = 'novo'
                    break;
                  case 1:
                    sugestao['status'] = 'pendente'
                    break;
                  case 2:
                    sugestao['status'] = 'fechado'
                    break;

                  default:
                    break;
                }
                return sugestao;
              });
              resolve(sugestoes);
            }).catch(reason => {
              reject(reason);
            });
        });
    })
  }

  public listarLocal(data_inicio: Date, data_fim: Date, esc_id: number, statusSugestao: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'sus.sus_id_int as sus_id', 'usr.usr_nome_txt as usuario',
        'esc.esc_nome_txt as escola', 'sus.sus_titulo_txt as titulo',
        'sus.sus_mensagem_txt as mensagem', 'sus.sus_tipo_sugestao_txt as tipo',
        'sus.sus_data_sugestao_dte as data', 'sus.sus_status_sugestao_int as valor_status',
        '0 as status'
      ];
      this.sugestaoUsuarioRepository.createQueryBuilder('sus')
        .select(campos)
        .innerJoin('sus.usuario', 'usr')
        .innerJoin('sus.escola', 'esc')
        .where('date(sus_data_sugestao_dte) >= date(:data_inicio)', { data_inicio: data_inicio })
        .andWhere('date(sus_data_sugestao_dte) <= date(:data_fim)', { data_fim: data_fim })
        .andWhere('sus_status_sugestao_int = :statusSugestao', { statusSugestao: statusSugestao })
        .andWhere('esc.esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then((sugestoes: any[]) => {
          sugestoes = sugestoes.map(sugestao => {
            switch (sugestao['status']) {
              case 0:
                sugestao['status'] = 'novo'
                break;
              case 1:
                sugestao['status'] = 'pendente'
                break;
              case 2:
                sugestao['status'] = 'fechado'
                break;

              default:
                break;
            }
            return sugestao;
          });
          resolve(sugestoes);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public alterar(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const sugestaoUsuario = new SugestaoUsuario();
      sugestaoUsuario.usr_id = dados['usrId'];
      sugestaoUsuario.id = dados['susId'];
      sugestaoUsuario.status_sugestao = dados['statusSugestao'];
      this.sugestaoUsuarioRepository.save(sugestaoUsuario).then(() => {
        const sugestaoUsuarioHistorico = new SugestaoUsuarioHistorico();
        sugestaoUsuarioHistorico.status_modificado = dados['statusSugestao'];
        sugestaoUsuarioHistorico.data_alteracao = new Date();
        sugestaoUsuarioHistorico.observacao = dados['observacao'];
        sugestaoUsuarioHistorico.sus_id = sugestaoUsuario.id;
        sugestaoUsuarioHistorico.usr_id = dados['usrId'];
        this.sugestaoUsuarioHistoricoRepository.save(sugestaoUsuarioHistorico).then(() => {
          resolve()
        }).catch(reason => {
          reject(reason);
        });
      }).catch(reason => {
        reject(reason);
      });
    })
  }



}
