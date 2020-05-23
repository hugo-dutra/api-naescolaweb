import { EstudanteIntegracaoDto } from './dto/estudante-integracao.dto';
import { EstudanteRepository } from './estudante.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudante } from './estudante.entity';
import { InsertResult } from 'typeorm';

@Injectable()
export class EstudanteService {
  constructor(@InjectRepository(EstudanteRepository) private estudanteRepository: EstudanteRepository) { }

  public inserirEstudanteIntegracao(estudantesIntegracao: EstudanteIntegracaoDto[], esc_id: number): Promise<Estudante[]> {
    return new Promise((resolve, reject) => {
      const estudantes = estudantesIntegracao.map((estudanteIntegracao: EstudanteIntegracaoDto) => {
        const estudante = new Estudante();
        estudante.id = estudanteIntegracao.idpes;
        estudante.est_cep = estudanteIntegracao.cep;
        estudante.est_endereco = estudanteIntegracao.bai_no + ' ' + estudanteIntegracao.log_no + ' ' + estudanteIntegracao.complemento;
        estudante.est_envio_msg_status = 1;
        estudante.est_mae = estudanteIntegracao.nome_mae;
        estudante.est_matricula = estudanteIntegracao.cod_matricula;
        estudante.est_nascimento = estudanteIntegracao.data_nasc;
        estudante.est_nome = estudanteIntegracao.nome;
        estudante.est_pai = estudanteIntegracao.nome_pai;
        estudante.est_responsavel = estudanteIntegracao.nome_resp;
        estudante.est_status_ativo = 1;
        estudante.est_status_ativo = 1;
        estudante.esc_id = esc_id;
        return estudante;
      });


      this.estudanteRepository.save(estudantes).then((novosEstudante: Estudante[]) => {
        resolve(novosEstudante);
      });

    });
  }
}
