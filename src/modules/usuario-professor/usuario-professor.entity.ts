import { Usuario } from './../usuario/usuario.entity';
import { BaseEntity, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Professor } from '../professor/professor.entity';

@Entity('usuario_professor_upr')
export class UsuarioProfessor extends BaseEntity {
  /* RELACIONAMENTOS */
  @ManyToOne(type => Usuario, usuario => usuario.usuariosProfessores, { eager: false })
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => Professor, professor => professor.usuariosProfessores, { eager: false })
  @JoinColumn({ name: 'prf_id_int' })
  professor: Professor;

}