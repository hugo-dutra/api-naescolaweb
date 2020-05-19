import { OcorrenciaDisciplinar } from './../ocorrencia-disciplinar/ocorrencia-disciplinar.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('status_entrega_mensagem_sem')
export class StatusEntregaMensagem extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'sem_status_entrega_id' })
  id: number;
  @Column({ name: 'sem_valor_txt', length: 45 })
  sem_valor: string;
  @OneToMany(type => OcorrenciaDisciplinar, ocorrenciaDisciplinar => ocorrenciaDisciplinar.statusEntregaMensagem, { eager: false })
  ocorrenciasDisciplinares: OcorrenciaDisciplinar[];

}