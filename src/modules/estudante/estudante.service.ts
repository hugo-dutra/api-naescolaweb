import { EstudanteIntegracaoDto } from './dto/estudante-integracao.dto';
import { EstudanteRepository } from './estudante.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudante } from './estudante.entity';
import { InsertResult } from 'typeorm';

@Injectable()
export class EstudanteService {
  constructor(@InjectRepository(EstudanteRepository) private estudanteRepository: EstudanteRepository) { }

  public inserirEstudanteIntegracao(estudantesIntegracao: EstudanteIntegracaoDto[], esc_id: number): Promise<Estudante[]> {
    return new Promise((resolve, reject) => {
      const estudantes = estudantesIntegracao.map((estudanteIntegracao: EstudanteIntegracaoDto) => {
        const estudante = new Estudante();
        estudante.id = estudanteIntegracao.idpes;
        estudante.est_cep = estudanteIntegracao.cep;
        estudante.est_endereco = estudanteIntegracao.bai_no + ' ' + estudanteIntegracao.log_no + ' ' + estudanteIntegracao.complemento;
        estudante.est_envio_msg_status = 1;
        estudante.est_mae = estudanteIntegracao.nome_mae;
        estudante.est_matricula = estudanteIntegracao.cod_matricula;
        estudante.est_nascimento = estudanteIntegracao.data_nasc;
        estudante.est_nome = estudanteIntegracao.nome;
        estudante.est_pai = estudanteIntegracao.nome_pai;
        estudante.est_responsavel = estudanteIntegracao.nome_resp;
        estudante.est_envio_msg_status = 1;
        estudante.est_status_ativo = 1;
        estudante.esc_id = esc_id;
        return estudante;
      });
      let contaEstudantesInseridas = 0;
      let arrayEstudantesInseridas = new Array<Estudante>();
      estudantes.forEach((estudante: Estudante) => {
        this.verificarExistenciaIntegracao(estudante).then((existe: boolean) => {
          contaEstudantesInseridas++
          if (!existe) {
            const queryString = 'insert into estudante_est ' +
              '( ' +
              'est_id_int, ' +
              'est_cep_txt, ' +
              'est_nome_txt, ' +
              'est_matricula_txt,' +
              'est_pai_txt,' +
              'est_mae_txt,' +
              'est_responsavel_txt,' +
              'est_endereco_txt,' +
              'est_status_ativo_int, ' +
              'est_envio_msg_status_int, ' +
              'est_nascimento_dte, ' +
              'esc_id_int' +
              ') values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
            this.estudanteRepository.query(queryString,
              [
                estudante.id, estudante.est_cep, estudante.est_nome,
                estudante.est_matricula, estudante.est_pai, estudante.est_mae,
                estudante.est_responsavel, estudante.est_endereco, estudante.est_status_ativo,
                estudante.est_envio_msg_status, estudante.est_nascimento, estudante.esc_id
              ]).then(() => {
                arrayEstudantesInseridas.push(estudante);
                if (contaEstudantesInseridas == 1) {
                  resolve(null);
                }
                if (contaEstudantesInseridas == estudantes.length) {
                  resolve(arrayEstudantesInseridas);
                }
              })
          } else {
            resolve(null)
          }
        }).catch((reason: any) => {
          reject(reason);
        });
      });


      /*
      this.estudanteRepository.save(estudantes).then((novosEstudante: Estudante[]) => {
        resolve(novosEstudante);
      }); */

    });
  }

  public verificarExistenciaIntegracao(estudante: Estudante): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.estudanteRepository.findByIds([estudante.id]).then((series: Estudante[]) => {
        if (series.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }




}
