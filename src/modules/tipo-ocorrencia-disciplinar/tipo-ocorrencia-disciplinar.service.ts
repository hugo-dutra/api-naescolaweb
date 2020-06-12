import { TipoOcorrenciaDisciplinarDto } from './dto/tipo-ocorrencia-disciplinar.dto';
import { TipoOcorrenciaDisciplinar } from './tipo-ocorrencia-disciplinar.entity';
import { TipoOcorrenciaDisciplinarRepository } from './tipo-ocorrencia-disciplinar.repository';
import { Injectable, BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class TipoOcorrenciaDisciplinarService {
  constructor(@InjectRepository(TipoOcorrenciaDisciplinarRepository) private tipoOcorrenciaDisciplinarRepository: TipoOcorrenciaDisciplinarRepository) { }

  public inserir(tipoOcorrenciaDisciplinarDto: TipoOcorrenciaDisciplinarDto): Promise<TipoOcorrenciaDisciplinar> {
    const tipoOcorrencia = this.mapearTipoOcorrenciaDtoParaTipoOcorrencia(tipoOcorrenciaDisciplinarDto);
    return new Promise((resolve, reject) => {
      this.verificarExistencia(tipoOcorrencia).then(existe => {
        if (!existe) {
          this.tipoOcorrenciaDisciplinarRepository.save(tipoOcorrencia).then(novoTipoOcorrenciaDisciplinar => {
            resolve(novoTipoOcorrenciaDisciplinar);
          })
        } else {
          resolve(null);
        }
      }).catch(reason => {
        reject(reason);
      })
    });
  }

  public listar(limit: number, offset: number, ascendente: boolean, esc_id: number): Promise<TipoOcorrenciaDisciplinarDto[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'tod.tod_id_int as id',
        'tod.tod_tipo_ocorrencia_txt as nome',
        'tod.tod_valor_num as valor',
        'tod.esc_id_int as esc_id',
      ];
      this.tipoOcorrenciaDisciplinarRepository.createQueryBuilder('tod')
        .select(campos)
        .where('tod.esc_id_int = :esc_id', { esc_id: esc_id })
        .orderBy('tod.tod_tipo_ocorrencia_txt', ascendente == true ? 'ASC' : 'DESC')
        .limit(limit)
        .offset(offset)
        .execute()
        .then(tiposOcorrenciaDisciplinarDto => {
          resolve(tiposOcorrenciaDisciplinarDto);
        }).catch(reason => {
          reject(reason);
        });
    });
  }

  public listarPorEstudante(est_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      reject(new BadGatewayException('Implementar consulta'));
      console.log(est_id)
      //resolve(null);
    })
  }

  public alterar(tipoOcorrenciaDisciplinarDto: TipoOcorrenciaDisciplinarDto): Promise<TipoOcorrenciaDisciplinarDto> {
    const tipoOcorrencia = this.mapearTipoOcorrenciaDtoParaTipoOcorrencia(tipoOcorrenciaDisciplinarDto);
    return new Promise((resolve, reject) => {
      this.verificarExistencia(tipoOcorrencia).then(existe => {
        if (!existe) {
          this.tipoOcorrenciaDisciplinarRepository.save(tipoOcorrencia).then(novoTipoOcorrenciaDisciplinar => {
            const tipoOcorrenciaDto = this.mapearTipoOcorrenciaParaTipoOcorrenciaDto(novoTipoOcorrenciaDisciplinar);
            resolve(tipoOcorrenciaDto);
          })
        } else {
          resolve(null);
        }
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public excluir(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.tipoOcorrenciaDisciplinarRepository.delete(id).then(deleteResult => {
        resolve(deleteResult);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public verificarExistencia(tipoOcorrenciaDisciplinar: TipoOcorrenciaDisciplinar): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.tipoOcorrenciaDisciplinarRepository
        .find({
          where: {
            tipo_ocorrencia: tipoOcorrenciaDisciplinar.tipo_ocorrencia,
            valor: tipoOcorrenciaDisciplinar.valor,
            esc_id: tipoOcorrenciaDisciplinar.esc_id
          }
        }).then(tiposOcorrenciaDisciplinar => {
          if (tiposOcorrenciaDisciplinar.length != 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).then(reason => {
          reject(reason);
        });
    });
  }

  public mapearTipoOcorrenciaDtoParaTipoOcorrencia(tipoOcorrenciaDisciplinarDto: TipoOcorrenciaDisciplinarDto): TipoOcorrenciaDisciplinar {
    const tipoOcorrenciaDisciplinar = new TipoOcorrenciaDisciplinar();
    tipoOcorrenciaDisciplinar.esc_id = tipoOcorrenciaDisciplinarDto.esc_id;
    tipoOcorrenciaDisciplinar.id = tipoOcorrenciaDisciplinarDto.id;
    tipoOcorrenciaDisciplinar.tipo_ocorrencia = tipoOcorrenciaDisciplinarDto.nome;
    tipoOcorrenciaDisciplinar.valor = tipoOcorrenciaDisciplinarDto.valor;
    return tipoOcorrenciaDisciplinar;
  }

  public mapearTipoOcorrenciaParaTipoOcorrenciaDto(tipoOcorrenciaDisciplinar: TipoOcorrenciaDisciplinar): TipoOcorrenciaDisciplinarDto {
    const tipoOcorrenciaDisciplinarDto = new TipoOcorrenciaDisciplinarDto();
    tipoOcorrenciaDisciplinarDto.esc_id = tipoOcorrenciaDisciplinar.esc_id;
    tipoOcorrenciaDisciplinarDto.id = tipoOcorrenciaDisciplinar.id;
    tipoOcorrenciaDisciplinarDto.nome = tipoOcorrenciaDisciplinar.tipo_ocorrencia
    tipoOcorrenciaDisciplinarDto.valor = tipoOcorrenciaDisciplinar.valor;
    return tipoOcorrenciaDisciplinarDto;
  }

}
