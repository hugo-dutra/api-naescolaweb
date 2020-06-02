import { TelefoneContatoEstudanteService } from './telefone-contato-estudante.service';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TelefoneContatoEstudante } from './telefone-contato-estudante.entity';


@Controller('telefone-contato-estudante')
export class TelefoneContatoEstudanteController {
  constructor(private telefoneContatoEstudanteService: TelefoneContatoEstudanteService) { }

  @Post()
  inserir(@Body() telefones: any[]): Promise<TelefoneContatoEstudante[]> {
    return this.telefoneContatoEstudanteService.inserir(telefones);
  }

  @Get('/:id')
  public listar(@Param('id') id: number): Promise<any[]> {
    return this.telefoneContatoEstudanteService.listar(id);
  }

}
