import { EscolaRepository } from './escola.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Escola } from './escola.entity';

@Injectable()
export class EscolaService {
  constructor(@InjectRepository(EscolaRepository) private escolaRepository: EscolaRepository) { }

  public inserir(escolaDto: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const escola = new Escola();
      escola.assinatura_gestor = escolaDto['assinatura_gestor'];
      escola.cep = escolaDto['cep'];
      escola.cnpj = escolaDto['cnpj'];
      escola.email = escolaDto['email'];
      escola.endereco = escolaDto['endereco'];
      escola.inep = escolaDto['inep'];
      escola.nome = escolaDto['nome'];
      escola.logo = escolaDto['logo'];
      escola.nome_abreviado = escolaDto['nome_abreviado'];
      escola.ree_id = parseInt(escolaDto['ree_id']);
      escola.ren_id = parseInt(escolaDto['ren_id']);
      escola.telefone = escolaDto['telefone'];
      this.verificarExistenciaPorInep(escola.inep).then(existe => {
        if (!existe) {
          this.escolaRepository.save(escola).then(novaEscola => {
            resolve();
          }).catch(reason => {
            reject(reason);
          });
        } else {
          resolve('escola existente')
        }
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public verificarExistenciaPorInep(inep: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.find({ where: { inep: inep } }).then(escolas => {
        if (escolas.length != 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
  }


  public pegarIdRegiaoEscolaPorEscolaId(esc_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.findOne(esc_id).then((escola: Escola) => {
        resolve(escola.ree_id);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }
}
