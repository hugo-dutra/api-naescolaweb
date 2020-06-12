import { AtestadoMedico } from './atestado-medico.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(AtestadoMedico)
export class AtestadoMedicoRepository extends Repository<AtestadoMedico>{ }