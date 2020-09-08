import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConceitoRepository } from './conceito.repository';
import ConceitoDto from './dto/conceito.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ConceitoService {
  constructor(@InjectRepository(ConceitoRepository) private conceitoRepository: ConceitoRepository) { }

  public inserir(conceitoDto: ConceitoDto): Promise<ConceitoDto> {
    return new Promise((resolve, reject) => {
      this.conceitoRepository.save(conceitoDto).then(novoConceitoDto => {
        resolve(novoConceitoDto);
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public listarPorEscolaId(escId: number): Promise<ConceitoDto[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'cct_id_int as id',
        'cct_nome_txt as nome',
        'cct_abreviatura_txt as abreviatura',
        'cct_reprova_bit as reprova',
        'esc_id_int as esc_id ',
        'cct_ordem_num as ordem ']
      this.conceitoRepository
        .createQueryBuilder('cct')
        .select(campos)
        .where('esc_id_int = :esc_id', { esc_id: escId })
        .execute()
        .then(conceitos => {
          resolve(conceitos);
        })
        .catch(reason => {
          reject(reason)
        })
    })
  }

  public alterar(conceitoDto: ConceitoDto): Promise<ConceitoDto> {
    return new Promise((resolve, reject) => {
      this.conceitoRepository.save(conceitoDto).then(novoConceito => {
        resolve(novoConceito);
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public excluir(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.conceitoRepository.delete(id).then(deleteResult => {
        resolve(deleteResult)
      }).catch(reason => {
        reject(reason)
      })
    })
  }

}
