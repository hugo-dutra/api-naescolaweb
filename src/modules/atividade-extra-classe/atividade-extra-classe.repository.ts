import { AtividadeExtraClasse } from './atividade-extra-classe.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(AtividadeExtraClasse)
export class AtividadeExtraClasseRepository extends Repository<AtividadeExtraClasse> { }