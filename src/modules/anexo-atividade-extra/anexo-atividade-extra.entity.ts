import { AtividadeExtraClasse } from './../atividade-extra-classe/atividade-extra-classe.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('anexo_atividade_extra_aae')
export class AnexoAtividadeExtra extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'aae_id_int' })
  id: number;
  @Column({ name: 'aae_nome_anexo_txt', length: 500, nullable: false })
  aae_nome_anexo: string;
  @Column({ name: 'aae_tipo_anexo_txt', length: 10, nullable: false })
  aae_tipo_anexo: string;
  @Column({ name: 'aae_tamanho_anexo_int', nullable: false })
  aae_tamanho_anexo: number;
  @Column({ name: 'aae_url_txt', length: 2000, nullable: false })
  aae_url: string;
  /* RELACIONAMENTOS */
  @ManyToOne(type => AtividadeExtraClasse, atividadeExtraClasse => atividadeExtraClasse.anexosAtividadeExtra)
  @JoinColumn({ name: 'aec_id_int' })
  atividadeExtraClasse: AtividadeExtraClasse;
}