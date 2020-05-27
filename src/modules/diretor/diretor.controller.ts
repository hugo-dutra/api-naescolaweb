import { ListagemDiretorDto } from './dto/listagem.dto';
import { DiretorService } from './diretor.service';
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { Diretor } from './diretor.entity';
import { DiretorEscola } from '../diretor-escola/diretor-escola.entity';
import { DeleteResult } from 'typeorm';


@Controller('diretor')
export class DiretorController {
  constructor(private diretorService: DiretorService) { }

  @Post()
  public inserir(@Body() body: any): Promise<[Diretor, DiretorEscola]> {
    const diretor: Diretor = body['diretor']
    const esc_id: number = body['esc_id']
    return this.diretorService.inserir(diretor, esc_id);
  }

  @Get('/listar/:limit/:offset/:asc')
  public listar(@Param('limit') limit: number, @Param('offset') offset: number, @Param('asc') asc: boolean): Promise<ListagemDiretorDto[]> {
    return this.diretorService.listarGlobal(limit, offset, asc);
  }

  @Get('/listar-regional/:limit/:offset/:asc/:esc_id')
  public listarRegional(@Param('limit') limit: number, @Param('offset') offset: number, @Param('asc') asc: boolean, @Param('esc_id') esc_id: number): Promise<ListagemDiretorDto[]> {
    return this.diretorService.listarRegional(limit, offset, asc, esc_id);
  }

  @Get('/listar-local/:limit/:offset/:asc/:esc_id')
  public listarLocal(@Param('limit') limit: number, @Param('offset') offset: number, @Param('asc') asc: boolean, @Param('esc_id') esc_id: number): Promise<ListagemDiretorDto[]> {
    return this.diretorService.listarLocal(limit, offset, asc, esc_id);
  }


  @Get('/filtrar/:valor/:limit/:offset')
  public filtrar(@Param('valor') valor: string, @Param('limit') limit: number, @Param('offset') offset: number): Promise<ListagemDiretorDto[]> {
    return this.diretorService.filtrar(valor, limit, offset);
  }

  @Get('/filtrar-regional/:valor/:limit/:offset/:esc_id')
  public filtrarRegional(@Param('valor') valor: string, @Param('limit') limit: number, @Param('offset') offset: number, @Param('esc_id') esc_id: number): Promise<ListagemDiretorDto[]> {
    return this.diretorService.filtrarRegional(valor, limit, offset, esc_id);
  }

  @Get('/filtrar-local/:valor/:limit/:offset/:esc_id')
  public filtrarLocal(@Param('valor') valor: string, @Param('limit') limit: number, @Param('offset') offset: number, @Param('esc_id') esc_id: number): Promise<ListagemDiretorDto[]> {
    return this.diretorService.filtrarLocal(valor, limit, offset, esc_id);
  }

  @Get('/sem-escola')
  public listarSemEscola(): Promise<ListagemDiretorDto[]> {
    return this.diretorService.listarSemEscola();
  }

  @Patch()
  public alterar(@Body() diretor: Diretor): Promise<Diretor> {
    return this.diretorService.alterar(diretor);
  }

  @Delete()
  public excluir(@Body() diretor: Diretor): Promise<DeleteResult> {
    return this.diretorService.excluir(diretor.id);
  }

}
