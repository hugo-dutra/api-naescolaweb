import { UsuarioProfessorService } from './usuario-professor.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('usuario-professor')
export class UsuarioProfessorController {
  constructor(private usuarioProfessorService: UsuarioProfessorService) { }

  @Post()
  public inserir(@Body() dados: any[]): Promise<void> {
    return this.usuarioProfessorService.inserir(dados);
  }

  @Post('/desvincular')
  public desvincular(@Body() dados: any): Promise<void> {
    return this.usuarioProfessorService.desvincular(dados);
  }

}
