import { AlertaOcorrenciaVerificada } from './../alerta-ocorrencia-verificada/alerta-ocorrencia-verificada.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('observacao_alerta_ocorrencia_verificada_oov')
export class ObservacaoAlertaOcorrenciaVerificada extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'oov_id_int' })
  id: number;
  @Column({ name: 'oov_observacao_txt', length: 1000, nullable: false })
  observacao: string;
  @Column({ name: 'oov_data_verificacao_dte', nullable: false })
  data_verificacao: Date;
  /* RELACIONAMENTOS */
  @OneToMany(type => AlertaOcorrenciaVerificada, alertaOcorrenciaVerificada => alertaOcorrenciaVerificada.observacaoAlertaOcorrenciaVerificada)
  alertasOcorrenciasVerificadas: AlertaOcorrenciaVerificada[]


}