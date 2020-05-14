import { Serie } from './serie.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Serie)
export class SerieRepository extends Repository<Serie>{

}