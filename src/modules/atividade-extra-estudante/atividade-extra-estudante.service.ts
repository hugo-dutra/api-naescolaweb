import { AtividadeExtraEstudanteRepository } from './atividade-extra-estudante.repository';
import { AtividadeExtraExtudanteDto } from './dto/atividade-extra-estudante.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AtividadeExtraEstudante } from './atividade-extra-estudante.entity';

@Injectable()
export class AtividadeExtraEstudanteService {
  constructor(@InjectRepository(AtividadeExtraEstudanteRepository) private atividadeExtraEstudanteRepository: AtividadeExtraEstudanteRepository) { }

  public inserir(atividadesExtraEstudanteDto: AtividadeExtraExtudanteDto[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let atividadesExtraEstudante = new Array<AtividadeExtraEstudante>();
      atividadesExtraEstudante = atividadesExtraEstudanteDto.map(atividadeExtraEstudanteDto => {
        const atividade = new AtividadeExtraEstudante();
        atividade.aec_id = atividadeExtraEstudanteDto.aec_id;
        atividade.est_id = atividadeExtraEstudanteDto.est_id;
        atividade.firebase_dbkey = atividadeExtraEstudanteDto.aee_firebase_dbkey;
        atividade.status_entrega = atividadeExtraEstudanteDto.aee_status_entrega;
        return atividade;
      })
      this.atividadeExtraEstudanteRepository.save(atividadesExtraEstudante).then((novasAtividadesExtraEstudante) => {
        resolve(novasAtividadesExtraEstudante);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public listar(aec_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'aee.aee_id_int as aee_id', 'est.est_id_int as est_id',
        'est.est_nome_txt as nome', 'aec.aec_id_int as aec_id',
        'aee.aee_firebase_dbkey_txt as firebase_dbkey', 'aee.aee_status_entrega as status'
      ]
      this.atividadeExtraEstudanteRepository.createQueryBuilder('aee')
        .select(campos)
        .innerJoin('aee.estudante', 'est')
        .innerJoin('aee.atividadeExtraClasse', 'aec')
        .where('aee.aec_id_int = :aec_id', { aec_id: aec_id })
        .execute()
        .then((estudantes: any[]) => {
          estudantes = estudantes.map(estudante => {
            switch (estudante['status']) {
              case 0:
                estudante['status'] = 'enviada';
                break;
              case 1:
                estudante['status'] = 'recebida';
                break;
              case 2:
                estudante['status'] = 'lida';
                break;
            }
            return estudante;
          })
          resolve(estudantes);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

}
