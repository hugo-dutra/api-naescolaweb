import { RegraAlertaUsuario } from './regra-alerta-usuario.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(RegraAlertaUsuario)
export class RegraAlertaUsuarioRepository extends Repository<RegraAlertaUsuario>{ }