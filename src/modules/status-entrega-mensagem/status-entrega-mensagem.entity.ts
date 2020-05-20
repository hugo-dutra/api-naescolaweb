import { FrequenciaPortaria } from './../frequencia-portaria/frequencia-portaria.entity';
import { ComunicadoDiverso } from './../comunicado-diverso/comunicado-diverso.entity';
import { OcorrenciaDisciplinar } from './../ocorrencia-disciplinar/ocorrencia-disciplinar.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('status_entrega_mensagem_sem')
export class StatusEntregaMensagem extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'sem_status_entrega_id_int' })
  id: number;
  @Column({ name: 'sem_valor_txt', length: 45 })
  sem_valor: string;
  @OneToMany(type => OcorrenciaDisciplinar, ocorrenciaDisciplinar => ocorrenciaDisciplinar.statusEntregaMensagem, { eager: true })
  ocorrenciasDisciplinares: OcorrenciaDisciplinar[];
  @OneToMany(type => ComunicadoDiverso, comunicadoDiverso => comunicadoDiverso.statusEntregaMensagem, { eager: true })
  comunicadosDiversos: ComunicadoDiverso[];
  @OneToMany(type => FrequenciaPortaria, frequenciaPortaria => frequenciaPortaria.statusEntregaMensagem, { eager: true })
  frequenciasPortarias: FrequenciaPortaria[];

}