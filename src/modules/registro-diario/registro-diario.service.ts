import { RegistroFrequencia } from './../registro-frequencia/registro-frequencia.entity';
import { RegistroDiario } from './registro-diario.entity';
import { RegistroFrequenciaRepository } from './../registro-frequencia/registro-frequencia.repository';
import { RegistroDiarioRepository } from './registro-diario.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RegistroDiarioService {
  constructor(
    @InjectRepository(RegistroDiarioRepository) private registroDiarioRepository: RegistroDiarioRepository,
    @InjectRepository(RegistroFrequenciaRepository) private registroFrequenciaRepository: RegistroFrequenciaRepository,
  ) { }

  public inserir(dados: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const aulaDupla = dados['aula_dupla'];
      const registroDiario = new RegistroDiario();
      registroDiario.dip_id = dados['dip_id']
      registroDiario.data_registro = new Date(dados['data'] + ' 00:00:00');
      registroDiario.data_gravacao = new Date();
      registroDiario.registro_conteudo = dados['conteudo'];
      let contaInseridos = 0;
      this.registroDiarioRepository.save(registroDiario).then((novoRegistroDiario: RegistroDiario) => {
        const rdi_id = novoRegistroDiario.id;
        const quantidade = aulaDupla == true ? 2 : 1;
        const arrayRegistroFrequencia = new Array<RegistroFrequencia>()
        for (let i = 0; i < quantidade; i++) {
          const dadosFrequenciaEstudantes = <any[]>dados['arrayOfDadosFrequenciaEstudantes'];
          dadosFrequenciaEstudantes.forEach(dadoFrequenciaEstudante => {
            const valorFrequenciaRegistrada = dadoFrequenciaEstudante['frequenciaRegistrada'];
            const estId = dadoFrequenciaEstudante['est_id'];
            const registroFrequencia = new RegistroFrequencia();
            registroFrequencia.rdi_id = rdi_id;
            registroFrequencia.presente = valorFrequenciaRegistrada;
            registroFrequencia.data_hora = registroDiario.data_registro;
            registroFrequencia.status_push = 0;
            registroFrequencia.est_id = estId;
            arrayRegistroFrequencia.push(registroFrequencia);
          });
        }
        this.registroFrequenciaRepository.save(arrayRegistroFrequencia).then((novosRegistrosFrequencia: RegistroFrequencia[]) => {
          resolve();
        }).catch(reason => {
          reject(reason);
        })
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public listar(dip_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'rdi_id_int as rdi_id', 'dip_id_int as dip_id',
        'rdi_registro_conteudo_txt as conteudo', 'date(rdi_data_registro_dte) as data_registro',
        'date(rdi_data_gravacao_dte) as data_gravacao'
      ];
      this.registroDiarioRepository.createQueryBuilder('rdi').select(campos)
        .where('dip_id_int = :dip_id', { dip_id: dip_id })
        .orderBy('rdi_data_registro_dte', 'DESC')
        .execute()
        .then(registrosDiadios => {
          resolve(registrosDiadios)
        }).catch(reason => {
          reject(reason)
        });
    })
  }

  public alterar(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const registroDiario = new RegistroDiario();
      registroDiario.id = dados['rdi_id']
      registroDiario.registro_conteudo = dados['conteudo'];
      registroDiario.data_registro = new Date(dados['data_registro'] + ' 00:00:00');
      this.registroDiarioRepository.save(registroDiario).then(updateResult => {
        resolve();
      }).catch(reason => {
        reject(reason)
      })
    })
  }
}
