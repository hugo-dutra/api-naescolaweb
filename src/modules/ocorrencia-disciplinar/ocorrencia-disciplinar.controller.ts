import { OcorrenciaDisciplinar } from './ocorrencia-disciplinar.entity';
import { OcorrenciaDisciplinarService } from './ocorrencia-disciplinar.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('ocorrencia-disciplinar')
export class OcorrenciaDisciplinarController {
  constructor(private ocorrenciaDisciplinarService: OcorrenciaDisciplinarService) { }

  @Post()
  public inserir(@Body() dados: any): Promise<OcorrenciaDisciplinar[]> {
    return this.ocorrenciaDisciplinarService.inserir(dados);
  }

}

