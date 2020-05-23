import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RedeEnsino } from './rede-ensino.entity';
import { RedeEnsinoService } from './rede-ensino.service';

@Controller('rede-ensino')
export class RedeEnsinoController {
  constructor(private redeEnsinoService: RedeEnsinoService) { }

  @Post()
  public inserirRedeEnsino(@Body() redeEnsino: RedeEnsino): Promise<RedeEnsino> {
    return this.redeEnsinoService.inserirRedeEnsino(redeEnsino);
  }

  @Get()
  public async listarRedeEnsino(): Promise<RedeEnsino> {
    return this.redeEnsinoService.listarRedeEnsino();
  }

}
