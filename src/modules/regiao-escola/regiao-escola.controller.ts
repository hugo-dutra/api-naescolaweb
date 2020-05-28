import { RegiaoEscolaService } from './regiao-escola.service';
import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { RegiaoEscola } from './regiao-escola.entity';
import { DeleteResult } from 'typeorm';

@Controller('regiao-escola')
export class RegiaoEscolaController {
  constructor(private regiaoEscolaService: RegiaoEscolaService) { }

  @Post()
  public inserirRegiaoEscola(@Body() regiaoEscola: RegiaoEscola): Promise<RegiaoEscola> {
    return this.regiaoEscolaService.inserirRegiaoEscola(regiaoEscola);
  }

  @Get()
  public listarRegiaoEscola(): Promise<RegiaoEscola[]> {
    return this.regiaoEscolaService.listarRegiaoEscola();
  }

  @Patch()
  public alterarRegiaoEscola(@Body() regiaoEscola: RegiaoEscola): Promise<RegiaoEscola> {
    return this.regiaoEscolaService.alterarRegiaoEscola(regiaoEscola);
  }

  @Delete()
  public excluirRegiaoEscola(@Body() regiaoEscola: RegiaoEscola): Promise<DeleteResult> {
    return this.regiaoEscolaService.excluirRegiaoEscola(regiaoEscola.id);
  }

}
