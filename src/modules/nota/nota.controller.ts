import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotaDto } from './dto/nota.dto';
import { NotaService } from './nota.service';

@Controller('nota')
export class NotaController {
  constructor(private notaService: NotaService) { }

  @Post()
  public inserir(@Body() notaDto: NotaDto): Promise<NotaDto> {
    return this.notaService.salvar(notaDto);
  }

  @Get('/:esc_id')
  public listarPorEscolaId(@Param('esc_id') escId: number): Promise<any[]> {
    return this.notaService.listar(escId);
  }

}


