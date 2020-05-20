import { ResultadoBoletim } from './resultado-boletim.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(ResultadoBoletim)
export class ResultadoBoletimRepository extends Repository<ResultadoBoletim>{ }