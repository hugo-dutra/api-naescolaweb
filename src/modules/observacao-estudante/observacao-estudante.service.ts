import { Utils } from 'src/utils/utils';
import { ObservacaoEstudanteRepository } from './observacao-estudante.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObservacaoEstudanteDto } from './dto/observacao-estudante.dto';
import { DeleteResult } from 'typeorm';


@Injectable()
export class ObservacaoEstudanteService {
  public utils = new Utils();
  constructor(@InjectRepository(ObservacaoEstudanteRepository) private observacaoEstudanteRepository: ObservacaoEstudanteRepository) { }

  public inserir(observacaoEstudanteDto: ObservacaoEstudanteDto): Promise<ObservacaoEstudanteDto> {
    return new Promise((resolve, reject) => {
      observacaoEstudanteDto.data_hora = this.utils.agora();
      this.observacaoEstudanteRepository.save(observacaoEstudanteDto).then(novaObservacaoEstudante => {
        resolve(novaObservacaoEstudante);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public listar(est_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'obe.obe_id_int as id',
        'obe.obe_observacao_txt as observacao',
        'obe.obe_data_hora_dtm as data_hora',
        'usr.usr_id_int as usr_id',
        'usr.usr_nome_txt as usuario',
        'est.est_id_int as est_id',
        'est.est_nome_txt as estudante',
        'est_foto_txt as foto'
      ];
      this.observacaoEstudanteRepository.createQueryBuilder('obe').select(campos)
        .innerJoin('obe.usuario', 'usr')
        .innerJoin('obe.estudante', 'est')
        .where('obe.est_id_int = :est_id', { est_id: est_id })
        .orderBy('obe.obe_data_hora_dtm', 'DESC')
        .execute()
        .then(observacoes => {
          resolve(observacoes);
        }).catch(reason => {
          reject(reason);
        });
    });
  }

  public alterar(observacaoEstudanteDto: ObservacaoEstudanteDto): Promise<ObservacaoEstudanteDto> {
    return new Promise((resolve, reject) => {
      this.observacaoEstudanteRepository.save(observacaoEstudanteDto).then(observacaoEstudanteAlterada => {
        resolve(observacaoEstudanteAlterada);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public excluir(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.observacaoEstudanteRepository.delete(id).then(deleteResult => {
        resolve(deleteResult);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

}
