import { AlertaOcorrenciaVerificada } from './../alerta-ocorrencia-verificada/alerta-ocorrencia-verificada.entity';
import { StatusEntregaMensagem } from './../status-entrega-mensagem/status-entrega-mensagem.entity';
import { TipoOcorrenciaDisciplinar } from './../tipo-ocorrencia-disciplinar/tipo-ocorrencia-disciplinar.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Estudante } from "../estudante/estudante.entity";
import { Usuario } from "../usuario/usuario.entity";

@Entity('ocorrencia_disciplinar_ocd')
export class OcorrenciaDisciplinar extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'ocd_id_int' })
  id: number;
  @Column({ name: 'ocd_ocorrencia_txt', nullable: false, length: 1000 })
  ocd_ocorrencia: string;
  @Column({ name: 'ocd_data_hora_dtm', nullable: false })
  ocd_data_hora: Date;
  @Column({ name: 'ocd_firebase_dbkey_txt', length: 50 })
  ocd_firebase_dbkey: string;
  @Column({ name: 'ocd_firebase_dbkey_administrativo_txt', length: 50 })
  ocd_firebase_dbkey_administrativo: string;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Usuario, usuario => usuario.ocorrenciasDisciplinares, { eager: false })
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => Estudante, estudante => estudante.ocorrenciasDisciplinares, { eager: false })
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
  @ManyToOne(type => TipoOcorrenciaDisciplinar, tipoOcorrenciaDisciplinar => tipoOcorrenciaDisciplinar.ocorrenciasDisciplinares, { eager: false })
  @JoinColumn({ name: 'tod_id_int' })
  tipoOcorrenciaDisciplinar: TipoOcorrenciaDisciplinar;
  @ManyToOne(type => StatusEntregaMensagem, statusEntregaMensagem => statusEntregaMensagem.ocorrenciasDisciplinares, { eager: false })
  @JoinColumn({ name: 'ocd_status_entrega_int' })
  statusEntregaMensagem: StatusEntregaMensagem;
  @OneToMany(type => AlertaOcorrenciaVerificada, alertaOcorrenciaVerificada => alertaOcorrenciaVerificada.ocorrenciaDisciplinar, { eager: true })
  alertasOcorrenciasVerificadas: AlertaOcorrenciaVerificada[];
}
