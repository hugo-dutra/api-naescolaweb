import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MencaoRepository } from './mencao.repository';
import MencaoDto from './dto/mencao.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class MensaoService {
  constructor(@InjectRepository(MencaoRepository) private mencaoRepository: MencaoRepository) { }

  public inserir(mencaoDto: MencaoDto): Promise<MencaoDto> {
    return new Promise((resolve, reject) => {
      this.mencaoRepository.save(mencaoDto).then(novaMencao => {
        resolve(novaMencao);
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public listarPorEscolaId(escId: number): Promise<MencaoDto[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'mnc_id_int as id',
        'mnc_nome_txt as nome',
        'mnc_abreviatura_txt as abreviatura',
        'mnc_reprova_bit as reprova',
        'esc_id_int as esc_id ',
        'mnc_ordem_num as ordem ']
      this.mencaoRepository
        .createQueryBuilder('mns')
        .select(campos)
        .where('esc_id_int = :esc_id', { esc_id: escId })
        .execute()
        .then(mencoes => {
          resolve(mencoes);
        })
        .catch(reason => {
          reject(reason)
        })
    })
  }

  public alterar(mencaoDto: MencaoDto): Promise<MencaoDto> {
    return new Promise((resolve, reject) => {
      this.mencaoRepository.save(mencaoDto).then(novaMencao => {
        resolve(novaMencao);
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public excluir(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.mencaoRepository.delete(id).then(deleteResult => {
        resolve(deleteResult)
      }).catch(reason => {
        reject(reason)
      })
    })
  }


}
