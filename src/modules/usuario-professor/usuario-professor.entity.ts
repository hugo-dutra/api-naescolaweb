import { Usuario } from './../usuario/usuario.entity';
import { BaseEntity, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Professor } from '../professor/professor.entity';

@Entity('usuario_professor_upr')
export class UsuarioProfessor extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'upr_id_int' })
  id: number;
  @Column({ name: 'usr_id_int' })
  usr_id: number;
  @Column({ name: 'prf_id_int' })
  prf_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Usuario, usuario => usuario.usuariosProfessores)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => Professor, professor => professor.usuariosProfessores)
  @JoinColumn({ name: 'prf_id_int' })
  professor: Professor;
}