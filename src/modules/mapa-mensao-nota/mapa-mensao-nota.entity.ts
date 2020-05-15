import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('mapa_mensao_nota_mmn')
export class MapaMensaoNota extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'mmn_id_int' })
  id: number;
  @Column({ name: 'mmn_mensao_txt', length: 10, nullable: false })
  mmn_mensao: string;
  @Column({ name: 'mmn_valor_num', nullable: false })
  mmn_valor: number;
}