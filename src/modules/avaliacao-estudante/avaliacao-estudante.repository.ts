import { Repository, EntityRepository } from "typeorm";
import { AvaliacaoEstudante } from "./avaliacao-estudante.entity";

@EntityRepository(AvaliacaoEstudante)
export class AvaliacaoEstudanteRepository extends Repository<AvaliacaoEstudante>{ }