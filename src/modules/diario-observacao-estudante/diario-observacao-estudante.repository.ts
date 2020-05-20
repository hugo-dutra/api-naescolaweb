import { DiarioObservacaoEstudante } from './diario-observacao-estudante.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(DiarioObservacaoEstudante)
export class DiarioObservacaoEstudanteRepository extends Repository<DiarioObservacaoEstudante>{ }