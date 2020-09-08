import { MetricaLivre } from './metrica-livre.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(MetricaLivre)
export class MetricaLivreRepository extends Repository<MetricaLivre>{ }