import { ProfessorDisciplina } from './../professor-disciplina/professor-disciplina.entity';
import { AtividadeExtraEstudante } from './../atividade-extra-estudante/atividade-extra-estudante.entity';
import { AnexoAtividadeExtra } from './../anexo-atividade-extra/anexo-atividade-extra.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from '../usuario/usuario.entity';

@Entity('atividade_extra_classe_aec')
export class AtividadeExtraClasse extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'aec_id_int' })
  id: number;
  @Column({ name: 'aec_titulo_txt', length: 200, nullable: false })
  aec_titulo: string;
  @Column({ name: 'aec_descricao_txt', length: 1000, nullable: false })
  aec_descricao: string;
  @Column({ name: 'aec_data_envio_dte', nullable: false })
  aec_data_envio: Date;
  @Column({ name: 'aec_data_entrega_dte', nullable: false })
  aec_data_entrega: Date;
  /* RELACIONAMENTOS */
  @OneToMany(type => AnexoAtividadeExtra, anexoAtividadeExtra => anexoAtividadeExtra.atividadeExtraClasse, { eager: true })
  anexosAtividadeExtra: AnexoAtividadeExtra[];
  @OneToMany(type => AtividadeExtraEstudante, atividadeExtraEstudante => atividadeExtraEstudante.atividadeExtraClasse, { eager: true })
  atividadesExtraEstudante: AtividadeExtraEstudante[];
  @ManyToOne(type => Usuario, usuario => usuario.atividadesExtraClasse, { eager: false })
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => ProfessorDisciplina, professorDisciplina => professorDisciplina.atividadesExtraClasse, { eager: false })
  @JoinColumn({ name: 'prd_id_int' })
  professorDisciplina: ProfessorDisciplina;



}