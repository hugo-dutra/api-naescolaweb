import { ObservacaoEstudante } from './observacao-estudante.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(ObservacaoEstudante)
export class ObservacaoEstudanteRepository extends Repository<ObservacaoEstudante>{ }