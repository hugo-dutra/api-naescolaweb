import { RegraAlerta } from './../regra-alerta/regra-alerta.entity';
import { OcorrenciaDisciplinar } from './../ocorrencia-disciplinar/ocorrencia-disciplinar.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('tipo_ocorrencia_disciplinar_tod')
export class TipoOcorrenciaDisciplinar extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'tod_id_int' })
  id: number;
  @Column({ name: 'tod_tipo_ocorrencia_txt', length: 50, nullable: false })
  tod_tipo_ocorrencia: string;
  @Column({ name: 'tod_valor_num' })
  tod_valor: number;
  /* RELACIONAMENTOS */
  @OneToMany(type => OcorrenciaDisciplinar, ocorrenciaDisciplinar => ocorrenciaDisciplinar.tipoOcorrenciaDisciplinar, { eager: true })
  ocorrenciasDisciplinares: OcorrenciaDisciplinar[];
  @OneToMany(type => RegraAlerta, regraAlerta => regraAlerta.tipoOcorrenciaDisciplinar, { eager: true })
  regrasAlertas: RegraAlerta[];


}