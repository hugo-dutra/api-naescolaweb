import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('entidade_estudantil_eed')
export class EntidadeEstudantil extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'eed_id_int' })
  id: number;
  @Column({ name: 'eed_nome_txt', length: 250, nullable: false })
  eed_nome: string;
  @Column({ name: 'eed_vencimento_padrao_dte', nullable: false })
  eed_vencimento_padrao: Date;
}