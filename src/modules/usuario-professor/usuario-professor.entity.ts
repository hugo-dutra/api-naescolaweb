import { Usuario } from './../usuario/usuario.entity';
import { BaseEntity, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Professor } from '../professor/professor.entity';

@Entity('usuario_professor_upr')
export class UsuarioProfessor extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'upr_id_int' })
  /* RELACIONAMENTOS */
  @ManyToOne(type => Usuario, usuario => usuario.usuariosProfessores)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => Professor, professor => professor.usuariosProfessores)
  @JoinColumn({ name: 'prf_id_int' })
  professor: Professor;
}