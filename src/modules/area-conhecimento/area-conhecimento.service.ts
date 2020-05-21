import { AreaConhecimentoDto } from './dto/area-conhecimento.dto';
import { AreaConhecimentoRepository } from './area-conhecimento.repositoty';

import { Injectable } from '@nestjs/common';
import { AreaConhecimento } from './area-conhecimento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class AreaConhecimentoService {

  constructor(@InjectRepository(AreaConhecimentoRepository) private areaConhecimentoRepository: AreaConhecimentoRepository) { }

  public inserirAreaConhecimento(areaConhecimentoDto: AreaConhecimentoDto): Promise<InsertResult> {
    return new Promise((resolve, reject) => {
      this.areaConhecimentoRepository.insert(areaConhecimentoDto).then((insertResult: InsertResult) => {
        resolve(insertResult);
      }).catch((reason: any) => {
        reject(reason);
      })
    })
  }


  public listarAreaConhecimento(): Promise<AreaConhecimento[]> {
    return new Promise((resolve, reject) => {
      this.areaConhecimentoRepository.find().then((areasConhecimento: AreaConhecimento[]) => {
        resolve(areasConhecimento);
      }).catch((reason: any) => {
        reject(reason);
      })
    });
  }

  public alterarAreaConhecimento(areaConhecimentoDto: AreaConhecimentoDto): Promise<AreaConhecimentoDto> {
    return new Promise((resolve, reject) => {
      this.areaConhecimentoRepository.save(areaConhecimentoDto).then((areaConhecimentoDto: AreaConhecimentoDto) => {
        resolve(areaConhecimentoDto);
      }).catch((reason: any) => {
        reject(reason);
      })
    });
  }

  public excluirAreaConhecimento(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      console.log(id);
      this.areaConhecimentoRepository.delete(id).then((deleteResult: DeleteResult) => {
        resolve(deleteResult);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

}
