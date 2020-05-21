import { TurnoIntegracaoDto } from './dto/turno-integracao.dto';
import { TurnoService } from './turno.service';
import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { TurnoDto } from './dto/turno.dto';
import { Utils } from 'src/utils/utils';

@Controller('turno')
export class TurnoController {
  private utils = new Utils();
  constructor(private turnoService: TurnoService) { }

  @Post()
  public inserirTurno(@Body() turnoDto: TurnoDto): Promise<InsertResult> {
    return this.turnoService.inserirTurno(turnoDto);
  }

  @Post('/integracao')
  public inserirTurnoIntegracao(@Body() dadosTurnosIntegracaoDto: TurnoIntegracaoDto[]): Promise<TurnoDto[]> {
    const esc_id = dadosTurnosIntegracaoDto['esc_id'];
    const turnosIntegracaoDto: TurnoIntegracaoDto[] = dadosTurnosIntegracaoDto['turnos'];
    const turnosDto = turnosIntegracaoDto.map((turno: TurnoIntegracaoDto) => {
      const abrv = this.utils.abreviarStringComIniciais(turno.nm_turno);
      const turnoDto = new TurnoDto();
      turnoDto.abreviatura = abrv;
      turnoDto.esc_id = esc_id;
      turnoDto.horaFim = "00:00";
      turnoDto.horaInicio = "00:00";
      turnoDto.nome = turno.nm_turno;
      return turnoDto
    });
    return this.turnoService.inserirIntegracao(turnosDto);
  }


  @Get('/:id')
  public listarTurnos(@Param('id') esc_id: number): Promise<TurnoDto[]> {
    return this.turnoService.listarTurnosPorEscolaId(esc_id);
  }

  @Patch()
  public alterarTurnos(@Body() turnoDto: TurnoDto): Promise<UpdateResult> {
    return this.turnoService.alterarTurno(turnoDto);
  }

  @Delete()
  public apagarTurno(@Body() turnoDto: TurnoDto): Promise<DeleteResult> {
    return this.turnoService.excluirTurno(turnoDto.id);
  }


}

