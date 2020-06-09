
import { OcorrenciaDisciplinar } from './ocorrencia-disciplinar.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OcorrenciaDisciplinarRespository } from './ocorrencia-disciplinar.repository';

@Injectable()
export class OcorrenciaDisciplinarService {
  constructor(@InjectRepository(OcorrenciaDisciplinarRespository) private ocorrenciaDisciplinarRespository: OcorrenciaDisciplinarRespository) { }

  public inserir(dados: any): Promise<OcorrenciaDisciplinar[]> {
    return new Promise((resolve, reject) => {
      const arrayDetalhes = Array.from(dados['array_msg']);
      const tod_id = dados['tod_id'];
      const usr_id = dados['usr_id'];
      const data_hora = dados['data_hora'];
      const ocorrencia = dados['ocorrencia'];
      const arrayDeOcorrenciaDisciplinar = new Array<OcorrenciaDisciplinar>();
      arrayDetalhes.forEach(detalhe => {
        const ocorrenciaDisciplinar = new OcorrenciaDisciplinar();
        ocorrenciaDisciplinar.est_id = parseInt(detalhe['est_id']);
        ocorrenciaDisciplinar.data_hora = data_hora;
        ocorrenciaDisciplinar.firebase_dbkey = detalhe['firebase_dbkey'];
        ocorrenciaDisciplinar.tod_id = tod_id;
        ocorrenciaDisciplinar.usr_id = usr_id;
        ocorrenciaDisciplinar.ocorrencia = ocorrencia;
        ocorrenciaDisciplinar.status_entrega = 0;
        arrayDeOcorrenciaDisciplinar.push(ocorrenciaDisciplinar);
      });
      this.ocorrenciaDisciplinarRespository.save(arrayDeOcorrenciaDisciplinar).then(novaOcorrenciaDisciplinar => {
        resolve(novaOcorrenciaDisciplinar);
      }).catch(reason => {
        reject(reason);
      })
    });
  }

}
