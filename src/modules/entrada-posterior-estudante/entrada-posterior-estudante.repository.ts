import { EntradaPosteriorEstudante } from './entrada-posterior-estudante.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(EntradaPosteriorEstudante)
export class EntradaPosteriorEstudanteRepository extends Repository<EntradaPosteriorEstudante>{ }