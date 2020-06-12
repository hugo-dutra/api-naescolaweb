import { OcorrenciaDisciplinar } from './../ocorrencia-disciplinar/ocorrencia-disciplinar.entity';
import { ObservacaoAlertaOcorrenciaVerificada } from './../observacao-alerta-ocorrencia-verificada/observacao-alerta-ocorrencia-verificada.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Usuario } from '../usuario/usuario.entity';
import { Escola } from '../escola/escola.entity';

@Entity('alerta_ocorrencia_verificada_aov')
export class AlertaOcorrenciaVerificada extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'aov_id_int' })
  id: number;
  @Column({ name: 'oov_id_int' })
  oov_id: number;
  @Column({ name: 'ocd_id_int' })
  ocd_id: number;
  @Column({ name: 'usr_id_int' })
  usr_id: number;
  @Column({ name: 'esc_id_int' })
  esc_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => ObservacaoAlertaOcorrenciaVerificada, observacaoAlertaOcorrenciaVerificada => observacaoAlertaOcorrenciaVerificada.alertasOcorrenciasVerificadas)
  @JoinColumn({ name: 'oov_id_int' })
  observacaoAlertaOcorrenciaVerificada: ObservacaoAlertaOcorrenciaVerificada;
  @ManyToOne(type => OcorrenciaDisciplinar, ocorrenciaDisciplinar => ocorrenciaDisciplinar.alertasOcorrenciasVerificadas)
  @JoinColumn({ name: 'ocd_id_int' })
  ocorrenciaDisciplinar: OcorrenciaDisciplinar;
  @ManyToOne(type => Usuario, usuario => usuario.alertasOcorrenciasVerificadas)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => Escola, escola => escola.alertasOcorrenciasVerificadas)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
}