import { ObservacaoAlertaOcorrenciaVerificada } from "./observacao-alerta-ocorrencia-verificada.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(ObservacaoAlertaOcorrenciaVerificada)
export class ObservacaoAlertaOcorrenciaVerificadaRepository extends Repository<ObservacaoAlertaOcorrenciaVerificada>{ }