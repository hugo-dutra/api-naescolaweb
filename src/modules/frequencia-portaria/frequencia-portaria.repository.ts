import { FrequenciaPortaria } from './frequencia-portaria.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(FrequenciaPortaria)
export class FrequenciaPortariaRepository extends Repository<FrequenciaPortaria>{ }