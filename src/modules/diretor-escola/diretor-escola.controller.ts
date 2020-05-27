import { DiretorEscolaService } from './diretor-escola.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('diretor-escola')
export class DiretorEscolaController {
  constructor(private diretorEscolaService: DiretorEscolaService) { }

  @Post()
  public inserir(@Body() diretoresEscolas: any): Promise<void> {
    const diretores = diretoresEscolas['diretores'];
    const escolas = diretoresEscolas['escolas'];
    return this.diretorEscolaService.inserir(diretores, escolas);
  }
}
