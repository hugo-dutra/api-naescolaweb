import { SaidaAntecipadaRecorrente } from './saida-antecipada-recorrente.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(SaidaAntecipadaRecorrente)
export class SaidaAntecipadaRecorrenteRepository extends Repository<SaidaAntecipadaRecorrente>{

}