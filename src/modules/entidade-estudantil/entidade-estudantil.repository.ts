import { EntidadeEstudantil } from './entidade-estudantil.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(EntidadeEstudantil)
export class EntidadeEstudantilRepository extends Repository<EntidadeEstudantil>{ }