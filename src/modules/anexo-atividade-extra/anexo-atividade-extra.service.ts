import { AnexoAtividadeExtra } from './anexo-atividade-extra.entity';
import { AnexoAtividadeExtraRepository } from './anexo-atividade-extra.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnexoAtividadeExtraDto } from './dto/anexo-atividade-extra.dto';

@Injectable()
export class AnexoAtividadeExtraService {
  constructor(@InjectRepository(AnexoAtividadeExtraRepository) private anexoAtividadeExtraRepository: AnexoAtividadeExtraRepository) { }

  public inserir(anexosAtividadesExtraDto: AnexoAtividadeExtraDto[]): Promise<any> {
    return new Promise((resolve, reject) => {
      const anexosAtividadesExtra = anexosAtividadesExtraDto.map(anexoAtividadeExtraDto => {
        const anexoAtividadeExtra = new AnexoAtividadeExtra();
        anexoAtividadeExtra.aec_id = anexoAtividadeExtraDto.aec_id;
        anexoAtividadeExtra.nome_anexo = anexoAtividadeExtraDto.nome;
        anexoAtividadeExtra.tamanho_anexo = anexoAtividadeExtraDto.tamanho;
        anexoAtividadeExtra.tipo_anexo = anexoAtividadeExtraDto.tipo;
        anexoAtividadeExtra.url = anexoAtividadeExtraDto.url;
        return anexoAtividadeExtra;
      });
      this.anexoAtividadeExtraRepository.save(anexosAtividadesExtra).then((anexosAtividadeExtra) => {
        resolve(anexosAtividadeExtra);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public listar(aec_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'aae.aae_id_int as aae_id', 'aae.aae_nome_anexo_txt as nome',
        'aae.aae_tipo_anexo_txt as tipo', 'aae.aae_tamanho_anexo_int as tamanho',
        'aae.aae_url_txt as url', 'aae.aec_id_int  as aec_id'
      ];
      this.anexoAtividadeExtraRepository.createQueryBuilder('aae').select(campos)
        .where('aae.aec_id_int = :aec_id', { aec_id: aec_id })
        .execute()
        .then(anexos => {
          resolve(anexos);
        }).catch(reason => {
          reject(reason);
        })
    });
  }


}
