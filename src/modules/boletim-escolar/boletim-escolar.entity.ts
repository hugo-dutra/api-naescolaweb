import { ResultadoBoletim } from './../resultado-boletim/resultado-boletim.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Estudante } from '../estudante/estudante.entity';

@Entity('boletim_escolar_bes')
export class BoletimEscolar extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'bes_id_int' })
  id: number;
  @Column({ name: 'bes_ano_int' })
  ano: number;
  @Column({ name: 'est_matricula_txt', length: 50, nullable: true })
  est_matricula: string;
  @Column({ name: 'est_id_int' })
  est_id: number;
  /* RELACIONAMENTOS */
  @OneToMany(type => ResultadoBoletim, resultadoBoletim => resultadoBoletim.boletimEscolar)
  resultadosBoletins: ResultadoBoletim[];
  @ManyToOne(type => Estudante, estudante => estudante.boletinsEscolares)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;

}