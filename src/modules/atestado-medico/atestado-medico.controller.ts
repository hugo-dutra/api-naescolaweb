import { AtestadoMedicoDto } from './dto/atestado-medico.dto';
import { AtestadoMedicoService } from './atestado-medico.service';
import { Controller, Post, Body, Patch, Get, Param, Delete } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

@Controller('atestado-medico')
export class AtestadoMedicoController {
  constructor(private atestadoMedicoService: AtestadoMedicoService) { }
  @Post()
  public inserir(@Body() atestadoMedicoDto: AtestadoMedicoDto): Promise<any> {
    return this.atestadoMedicoService.inserir(atestadoMedicoDto);
  }

  @Get('/:nomeEstudante/:esc_id')
  public listar(@Param('nomeEstudante') nomeEstudante: string, @Param('esc_id') esc_id: number): Promise<any> {
    return this.atestadoMedicoService.listar(nomeEstudante, esc_id);
  }

  @Patch()
  public alterar(@Body() atestadoMedicoDto: AtestadoMedicoDto): Promise<any> {
    return this.atestadoMedicoService.alterar(atestadoMedicoDto);
  }

  @Delete()
  public excluir(@Body() atm_id: any): Promise<DeleteResult> {
    return this.atestadoMedicoService.excluir(atm_id)
  }


}
