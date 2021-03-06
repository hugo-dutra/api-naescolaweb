
import { BaseEntity, EntityRepository, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Escola } from '../escola/escola.entity';
import { Professor } from '../professor/professor.entity';

@Entity('professor_escola_pre')
export class ProfessorEscola extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'pre_id_int' })
  id: number;
  @Column({ name: 'esc_id_int' })
  esc_id: number;
  @Column({ name: 'prf_id_int' })
  prf_id: number;
  @ManyToOne(type => Escola, escola => escola.professoresEscolas)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
  @ManyToOne(type => Professor, professor => professor.professoresEscolas)
  @JoinColumn({ name: 'prf_id_int' })
  professor: Professor;

}