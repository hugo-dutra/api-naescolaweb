import { EscolaService } from './escola.service';
import { Controller, Body, Post } from '@nestjs/common';

@Controller('escola')
export class EscolaController {
  constructor(private escolaService: EscolaService) { }

  @Post()
  public inserir(@Body() escola: any): Promise<any> {
    return this.escolaService.inserir(escola);
  }

}
