import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TurnoRepository } from './turno.repository';
import { TurnoDto } from './dto/turno.dto';
import { Turno } from './turno.entity';
import { InsertResult, createQueryBuilder, UpdateResult, DeleteResult } from 'typeorm';
import { TurnoIntegracaoDto } from './dto/turno-integracao.dto';

@Injectable()
export class TurnoService {
  constructor(@InjectRepository(TurnoRepository) private turnoRepository: TurnoRepository) { }

  public inserirTurno(turnoDto: TurnoDto): Promise<InsertResult> {
    return new Promise((resolve, reject) => {
      this.turnoRepository.insert(turnoDto).then((insertResult: InsertResult) => {
        resolve(insertResult);
      }).catch((reason: any) => {
        reject(reason);
      })
    });
  }

  public inserirIntegracao(turnosDto: TurnoDto[]): Promise<TurnoDto[]> {
    return new Promise((resolve, reject) => {
      let contaInteracoes = 0;
      turnosDto.forEach((turno: Turno) => {
        const escId = turno.esc_id;
        const nome = turno.nome;
        this.procurarTurnoExistente(escId, nome).then((quantidade: number) => {
          if (quantidade == 0) {
            this.turnoRepository.save(turno).then((turno: TurnoDto) => {
              if (contaInteracoes == turnosDto.length) {
                resolve(turnosDto);
              }
            }).catch((reason: any) => {
              reject(reason);
            });
          }
          contaInteracoes++;
          if (contaInteracoes == turnosDto.length) {
            resolve(turnosDto);
          }
        });
      });
    });
  }

  public procurarTurnoExistente(esc_id: number, turno: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.turnoRepository.find({ where: { esc_id: esc_id, nome: turno } }).then((turnos: Turno[]) => {
        resolve(turnos.length);
      }).catch((reason: any) => {
        reject(reason);
      })
    })

  }

  public listarTurnosPorEscolaId(esc_id: number): Promise<TurnoDto[]> {
    return new Promise((resolve, reject) => {
      this.turnoRepository
        .find({ where: { esc_id: esc_id } })
        .then((turnos: Turno[]) => {
          resolve(turnos);
        }).catch((reason: any) => {
          reject(reason);
        })
    })
  }

  public alterarTurno(turnoDto: TurnoDto): Promise<UpdateResult> {
    return new Promise((resolve, reject) => {
      createQueryBuilder().update(Turno).set({
        abreviatura: turnoDto.abreviatura,
        horaFim: turnoDto.horaFim,
        horaInicio: turnoDto.horaInicio,
        nome: turnoDto.nome,
      }).where("id = :id", { id: turnoDto.id }).execute().then((updateResult: UpdateResult) => {
        resolve(updateResult);
      }).catch((reason: any) => {
        reject(reason);
      })
    });
  }

  public excluirTurno(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.turnoRepository.delete(id).then((deleteResult: DeleteResult) => {
        resolve(deleteResult);
      }).catch((reason: any) => {
        reject(reason);
      })
    })
  }



}
