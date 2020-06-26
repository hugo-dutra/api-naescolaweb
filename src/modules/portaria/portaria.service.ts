import { EscolaRepository } from './../escola/escola.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortariaRepository } from './portaria.repository';
import { Portaria } from './portaria.entity';

@Injectable()
export class PortariaService {
  constructor(
    @InjectRepository(PortariaRepository) private portariaRepository: PortariaRepository,
    @InjectRepository(EscolaRepository) private escolaRepository: EscolaRepository,
  ) { }

  public inserir(dadosPortaria: any): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(dadosPortaria);
      const portaria = new Portaria()
      portaria.esc_id = dadosPortaria['esc_id'];
      portaria.nome = dadosPortaria['nome'];
      this.pegarInepPorEscolaId(portaria.esc_id).then(inep => {
        this.portariaRepository.save(portaria).then(novaPortaria => {
          console.log(novaPortaria);
          const por_id = novaPortaria.id;
          novaPortaria.codigo_cadastro = `${inep}_${por_id}`;
          this.portariaRepository.createQueryBuilder('por')
            .update()
            .set({ codigo_cadastro: novaPortaria.codigo_cadastro })
            .where('por_id_int = :por_id', { por_id: por_id }).execute().then(updateResult => {
              resolve([{ por_id: por_id }]);
            }).catch(reason => {
              reject(reason);
            })
        }).catch(reason => {
          reject(reason);
        })
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public listar(esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'por_id_int as por_id', 'por_codigo_cadastro_txt as codigo',
        'esc_id_int as esc_id', 'por_nome_txt as nome'
      ]
      this.portariaRepository.createQueryBuilder('por')
        .select(campos)
        .where('esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then(portarias => {
          resolve(portarias)
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public alterar(dadosPortaria: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const portaria = new Portaria();
      portaria.id = dadosPortaria['por_id'];
      portaria.codigo_cadastro = dadosPortaria['codigo'];
      portaria.esc_id = dadosPortaria['esc_id'];
      portaria.nome = dadosPortaria['nome'];
      this.portariaRepository.save(portaria).then(portariaAlterada => {
        resolve();
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public excluir(por_id: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const id = por_id['por_id'];
      this.portariaRepository.delete(id).then(() => {
        resolve();
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public pegarInepPorEscolaId(esc_id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.findOne({ where: { id: esc_id } }).then(escola => {
        resolve(escola.inep);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

}

