import { AtividadeExtraClasse } from './atividade-extra-classe.entity';
import { AtividadeExtraClasseRepository } from './atividade-extra-classe.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { AtividadeExtraClasseDto } from './dto/atividade-extra-classe.dto';

@Injectable()
export class AtividadeExtraClasseService {
  constructor(@InjectRepository(AtividadeExtraClasseRepository) private atividadeExtraClasseRepository: AtividadeExtraClasseRepository) { }

  public inserir(atividadeExtraClasseDto: AtividadeExtraClasseDto): Promise<any> {
    return new Promise((resolve, reject) => {
      const atividadeExtraClasse = new AtividadeExtraClasse();
      atividadeExtraClasse.data_entrega = atividadeExtraClasseDto.aec_data_entrega;
      atividadeExtraClasse.data_envio = atividadeExtraClasseDto.aec_data_envio;
      atividadeExtraClasse.descricao = atividadeExtraClasseDto.aec_descricao;
      atividadeExtraClasse.titulo = atividadeExtraClasseDto.aec_titulo;
      atividadeExtraClasse.prd_id = parseInt(atividadeExtraClasseDto.prd_id.toString());
      atividadeExtraClasse.usr_id = atividadeExtraClasseDto.usr_id;
      this.atividadeExtraClasseRepository.save(atividadeExtraClasse).then(novaAtividadeExtraClasse => {
        resolve([{ aec_id: novaAtividadeExtraClasse.id }]);
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public listar(esc_id: number, dataInicio: Date, dataFim: Date): Promise<any> {
    return new Promise((resolve, reject) => {
      const campos = [
        'distinct(aec.aec_id_int) as aec_id', 'aec.aec_titulo_txt as titulo',
        'aec.aec_descricao_txt as descricao', 'aec.aec_data_envio_dte as data_envio',
        'aec.aec_data_entrega_dte as data_entrega', 'aec.usr_id_int as usr_id',
        'usr.usr_nome_txt as usuario', 'aec.prd_id_int as prd_id',
        'dsp.dsp_nome_txt as disciplina', 'prf.prf_nome_txt as professor'
      ];
      this.atividadeExtraClasseRepository.createQueryBuilder('aec')
        .select(campos)
        .innerJoin('aec.usuario', 'usr')
        .innerJoin('usr.usuariosEscolas', 'usee')
        .innerJoin('aec.professorDisciplina', 'prd')
        .innerJoin('prd.disciplina', 'dsp')
        .innerJoin('prd.professor', 'prf')
        .innerJoin('aec.atividadesExtraEstudante', 'aee')
        .innerJoin('aee.estudante', 'est')
        .where('usee.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('date(aec.aec_data_envio_dte) >= date(:dataInicio)', { dataInicio: dataInicio })
        .andWhere('date(aec.aec_data_envio_dte) <= date(:dataFim)', { dataFim: dataFim })
        .execute()
        .then((atividades: any[]) => {
          if (atividades.length != 0) {
            resolve(atividades);
          } else {
            resolve([]);
          }
        }).catch(reason => {
          reject(reason);
        });
    })

  }
}
