import { EstudanteDto } from './dto/estudante.dto';
import { EstudanteService } from './estudante.service';
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { EstudanteIntegracaoDto } from './dto/estudante-integracao.dto';
import { EstudanteIntegracaoEnturmarDto } from '../estudante-turma/dto/estudante-integracao-enturmar.dto';
import { Estudante } from './estudante.entity';

@Controller('estudante')
export class EstudanteController {
  constructor(private estudanteService: EstudanteService) { }

  @Post()
  public inserir(@Body() estudanteDto: EstudanteDto): Promise<any> {
    return this.estudanteService.inserir(estudanteDto);
  }

  @Post('/integracao/:esc_id')
  public inserirEstudanteIntegracao(@Body() estudantesIntegracaoDto: EstudanteIntegracaoDto[], @Param('esc_id') esc_id: number): Promise<any> {
    return this.estudanteService.inserirEstudanteIntegracao(estudantesIntegracaoDto, esc_id);
  }

  @Get('/local/:limit/:offset/:asc/:esc_id')
  public listarLocal(@Param('limit') limit: number, @Param('offset') offset: number, @Param('asc') asc: boolean, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.estudanteService.listarLocal(limit, offset, asc, esc_id);
  }

  @Get('/regional/:limit/:offset/:asc/:esc_id')
  public listarRegional(@Param('limit') limit: number, @Param('offset') offset: number, @Param('asc') asc: boolean, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.estudanteService.listarRegional(limit, offset, asc, esc_id);
  }

  @Get('/global/:limit/:offset/:asc')
  public listarGlobal(@Param('limit') limit: number, @Param('offset') offset: number, @Param('asc') asc: boolean): Promise<any[]> {
    return this.estudanteService.listarGlobal(limit, offset, asc);
  }






}
