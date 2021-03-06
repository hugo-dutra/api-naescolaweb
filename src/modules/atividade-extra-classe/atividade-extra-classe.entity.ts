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
  titulo: string;
  @Column({ name: 'aec_descricao_txt', length: 1000, nullable: false })
  descricao: string;
  @Column({ name: 'aec_data_envio_dte', nullable: false })
  data_envio: Date;
  @Column({ name: 'aec_data_entrega_dte', nullable: false })
  data_entrega: Date;
  @Column({ name: 'usr_id_int' })
  usr_id: number;
  @Column({ name: 'prd_id_int' })
  prd_id: number;
  /* RELACIONAMENTOS */
  @OneToMany(type => AnexoAtividadeExtra, anexoAtividadeExtra => anexoAtividadeExtra.atividadeExtraClasse)
  anexosAtividadeExtra: AnexoAtividadeExtra[];
  @OneToMany(type => AtividadeExtraEstudante, atividadeExtraEstudante => atividadeExtraEstudante.atividadeExtraClasse)
  atividadesExtraEstudante: AtividadeExtraEstudante[];
  @ManyToOne(type => Usuario, usuario => usuario.atividadesExtraClasse)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => ProfessorDisciplina, professorDisciplina => professorDisciplina.atividadesExtraClasse)
  @JoinColumn({ name: 'prd_id_int' })
  professorDisciplina: ProfessorDisciplina;



}