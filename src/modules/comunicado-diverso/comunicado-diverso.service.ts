import { StatusEntregaMensagem } from './../status-entrega-mensagem/status-entrega-mensagem.entity';
import { ComunicadoDiverso } from './comunicado-diverso.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComunicadoDiversoRepository } from './comunicado-diverso.repository';
import { ComunicadoDiversoDto } from './dto/comunicado-diverso.dto';

@Injectable()
export class ComunicadoDiversoService {
  constructor(@InjectRepository(ComunicadoDiversoRepository) private comunicadoDiversoRepository: ComunicadoDiversoRepository) { }

  public inserir(dados: ComunicadoDiversoDto[]): Promise<void> {
    return new Promise((resolve, reject) => {
      let comunicadosDiversos = dados.map(comunicadoDiversoDto => {
        const comunicadoDiverso = new ComunicadoDiverso();
        comunicadoDiverso.id = null;
        comunicadoDiverso.assunto = comunicadoDiversoDto.assunto;
        comunicadoDiverso.data = <Date><unknown>(comunicadoDiversoDto.data_comunicado.toString() + ' ' + comunicadoDiversoDto.hora.toString());
        comunicadoDiverso.fbdbkey = comunicadoDiversoDto.fbdbkey;
        comunicadoDiverso.hora = <Date><unknown>(comunicadoDiversoDto.data_comunicado.toString() + ' ' + comunicadoDiversoDto.hora.toString());
        comunicadoDiverso.mensagem = comunicadoDiversoDto.mensagem;
        comunicadoDiverso.cdi_status = comunicadoDiversoDto.status_comunicado;
        comunicadoDiverso.usr_id = comunicadoDiversoDto.usr_id;
        comunicadoDiverso.est_id = comunicadoDiversoDto.est_id;
        return comunicadoDiverso;
      })
      this.comunicadoDiversoRepository.save(comunicadosDiversos).then(novosComunicadosDiversos => {
        resolve();
      }).catch(reason => {
        resolve(reason);
      });
    });
  }

  public filtrar(status: Boolean, data_inicio: Date, data_fim: Date, limit: number, offset: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'cdi_id_int as id', 'cdi.est_id_int as est_id',
        'est.est_nome_txt as nome', 'sre.sre_abreviatura_txt as serie',
        'ete.ete_abreviatura_txt as etapa', 'trm.trm_nome_txt as turma',
        'trn.trn_nome_txt as turno', 'cdi.cdi_assunto_txt as assunto',
        'cdi.cdi_mensagem_txt as mensagem', 'cdi.cdi_data_dte as data_comunicado',
        'cdi.cdi_hora_tmr as hora', 'cdi.cdi_status_int as status_comunicado',
        'cdi.cdi_fbdbkey_txt as fbdbkey', 'cdi.usr_id_int as usr_id',
        'usr.usr_nome_txt as usuario', '0 as total'
      ];

      console.log(status, data_inicio, data_fim, limit, offset, esc_id);
      resolve(null);
    })
  }

}
