import { EtapaEnsinoDto } from './dto/etapa-ensino.dto';
import { EtapaEnsino } from './etapa-ensino.entity';
import { EtapaEnsinoRepository } from './etapa-ensino.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class EtapaEnsinoService {
  constructor(@InjectRepository(EtapaEnsinoRepository) private etapaEnsinoRepository: EtapaEnsinoRepository) { }

  public inserirEtapaEnsino(etapaEnsinoDto: EtapaEnsinoDto): Promise<InsertResult> {
    return new Promise((resolve, reject) => {
      this.etapaEnsinoRepository.insert(etapaEnsinoDto).then((insertResult: InsertResult) => {
        resolve(insertResult);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public inserirEtapaEnsinoIntegracao(etapasEnsinoDto: EtapaEnsinoDto[]): Promise<EtapaEnsinoDto[]> {

    return new Promise((resolve, reject) => {
      this.etapaEnsinoRepository.save(etapasEnsinoDto).then((etapaEnsinoDto: EtapaEnsinoDto[]) => {
        resolve(etapaEnsinoDto);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public listarEtapasEnsino(): Promise<EtapaEnsino[]> {
    return new Promise((resolve, reject) => {
      this.etapaEnsinoRepository.find().then((etapasEnsino: EtapaEnsino[]) => {
        resolve(etapasEnsino);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public listarEtapasEnsinoPorId(id: number[]): Promise<EtapaEnsino[]> {
    return new Promise((resolve, reject) => {
      this.etapaEnsinoRepository.findByIds(id).then((etapasEnsino: EtapaEnsino[]) => {
        resolve(etapasEnsino);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public alterarEtapaEnsino(etapaEnsinoDto: EtapaEnsinoDto): Promise<EtapaEnsinoDto> {
    return new Promise((resolve, reject) => {
      this.etapaEnsinoRepository.save(etapaEnsinoDto).then((etapaEnsinoDto: EtapaEnsinoDto) => {
        resolve(etapaEnsinoDto);
      }).catch((reason: any) => {
        reject(reason);
      })
    });
  }

  public excluirEtapaEnsino(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.etapaEnsinoRepository.delete(id).then((deleteResult: DeleteResult) => {
        resolve(deleteResult);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }


}
