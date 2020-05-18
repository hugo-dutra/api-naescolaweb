import { AtividadeExtraEstudante } from './atividade-extra-estudante.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(AtividadeExtraEstudante)
export class AtividadeExtraEstudanteRepository extends Repository<AtividadeExtraEstudante>{

}