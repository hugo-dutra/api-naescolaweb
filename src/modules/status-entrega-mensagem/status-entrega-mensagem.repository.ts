import { StatusEntregaMensagem } from './status-entrega-mensagem.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(StatusEntregaMensagem)
export class StatusEntregaMensagemRepository extends Repository<StatusEntregaMensagem>{ }