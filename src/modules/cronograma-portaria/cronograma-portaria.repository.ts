import { CronogramaPortaria } from './cronograma-portaria.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(CronogramaPortaria)
export class CronogramaPortariaRepository extends Repository<CronogramaPortaria>{ }