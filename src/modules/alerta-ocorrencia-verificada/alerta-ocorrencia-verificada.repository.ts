import { Repository, EntityRepository } from "typeorm";
import { AlertaOcorrenciaVerificada } from "./alerta-ocorrencia-verificada.entity";

@EntityRepository(AlertaOcorrenciaVerificada)
export class AlertaOcorrenciaVerificadaRepository extends Repository<AlertaOcorrenciaVerificada>{ }