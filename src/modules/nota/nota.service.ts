import { NotaDto } from './dto/nota.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotaRepository } from './nota.repository';

@Injectable()
export class NotaService {
  constructor(@InjectRepository(NotaRepository) private notaRepository: NotaRepository) { }

  public salvar(notaDto: NotaDto): Promise<NotaDto> {
    return new Promise((resolve, reject) => {
      this.notaRepository.save(notaDto).then((novaNota: NotaDto) => {
        resolve(novaNota);
      }).catch(reason => {
        reject(reason)
      })
    })
  }

  public listar(esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'nta_id_int as id', 'nta_media_num as media',
        'nta_maximo_num as maximo', 'nta_minimo_num as minimo',
        'esc_id_int as esc_id'
      ];
      this.notaRepository
        .createQueryBuilder('nta')
        .select(campos)
        .where('esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then((notas: any[]) => {
          resolve(notas)
        }).catch(reason => {
          reject(reason)
        })
    })
  }

}
