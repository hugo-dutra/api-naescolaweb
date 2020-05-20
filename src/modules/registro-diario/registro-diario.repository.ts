import { RegistroDiario } from "./registro-diario.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(RegistroDiario)
export class RegistroDiarioRepository extends Repository<RegistroDiario>{ }