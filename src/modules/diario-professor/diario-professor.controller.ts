import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { DiarioProfessorService } from './diario-professor.service';

@Controller('diario-professor')
export class DiarioProfessorController {
  constructor(private diarioProfessorService: DiarioProfessorService) { }

  @Post()
  public inserir(@Body() dados: any): Promise<void> {
    return this.diarioProfessorService.inserir(dados);
  }

  @Get('/listar-habilitado/:esc_id/:limit/:offset')
  public listarHabilitados(
    @Param('esc_id') esc_id: number, @Param('limit') limit: number, @Param('offset') offset: number): Promise<any[]> {
    return this.diarioProfessorService.listarHabilitados(esc_id, limit, offset);
  }

  @Get('/listar-disciplina-ano/:prd_id/:ano')
  public listarDisciplinaAno(
    @Param('prd_id') prd_id: number, @Param('ano') ano: number): Promise<any[]> {
    return this.diarioProfessorService.listarDisciplinaAno(prd_id, ano);
  }

  @Get('/filtrar-habilitado/:esc_id/:limit/:offset/:valor_filtro')
  public filtrarHabilitados(@Param('esc_id') esc_id: number, @Param('limit') limit: number, @Param('offset') offset: number, @Param('valor_filtro') valor_filtro: string): Promise<any[]> {
    return this.diarioProfessorService.filtrarHabilitados(esc_id, limit, offset, valor_filtro);
  }

  @Get('/listar-usuario-escola/:usr_id/:esc_id/:ano')
  public listarUsuarioEscola(@Param('usr_id') usr_id: number, @Param('esc_id') esc_id: number, @Param('ano') ano: number): Promise<any[]> {
    return this.diarioProfessorService.listarUsuarioEscola(usr_id, esc_id, ano);
  }

}
