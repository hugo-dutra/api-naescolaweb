import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MensaoRepository } from './mensao.repository';
import MensaoDto from './dto/mensao.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class MensaoService {
  constructor(@InjectRepository(MensaoRepository) private mensaoRepository: MensaoRepository) { }

  public inserir(mensaoDto: MensaoDto): Promise<MensaoDto> {
    return new Promise((resolve, reject) => {
      this.mensaoRepository.save(mensaoDto).then(novaMensao => {
        resolve(novaMensao);
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public listarPorEscolaId(escId: number): Promise<MensaoDto[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'mns_id_int as id',
        'mns_nome_txt as nome',
        'mns_abreviatura_txt as abreviatura',
        'mns_reprova_bit as reprova',
        'esc_id_int as esc_id ']
      this.mensaoRepository
        .createQueryBuilder('mns')
        .select(campos)
        .where('esc_id_int = :esc_id', { esc_id: escId })
        .execute()
        .then(mensoes => {
          resolve(mensoes);
        })
        .catch(reason => {
          reject(reason)
        })
    })
  }

  public alterar(mensaoDto: MensaoDto): Promise<MensaoDto> {
    return new Promise((resolve, reject) => {
      this.mensaoRepository.save(mensaoDto).then(novaMensao => {
        resolve(novaMensao);
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public excluir(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.mensaoRepository.delete(id).then(deleteResult => {
        resolve(deleteResult)
      }).catch(reason => {
        reject(reason)
      })
    })
  }


}
