import { BoletoMensalidade } from './boleto-mensalidade.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(BoletoMensalidade)
export class BoletoMensalidadeRepository extends Repository<BoletoMensalidade>{ }