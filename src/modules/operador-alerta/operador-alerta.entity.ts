import { RegraAlerta } from './../regra-alerta/regra-alerta.entity';
import { BaseEntity, Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('operador_alerta_opa')
export class OperadorAlerta extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'opa_id_int' })
  id: number;
  @Column({ name: 'opa_operador_txt', length: 100, nullable: false })
  operador: string;
  @Column({ name: 'opa_simbolo_txt', length: 0, nullable: false })
  simbolo: string;
  /* REPOSITORY */
  @OneToMany(type => RegraAlerta, regraAlerta => regraAlerta.operadorAlerta)
  regrasAlertas: RegraAlerta[];


}