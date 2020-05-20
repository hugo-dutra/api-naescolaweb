import { Repository, EntityRepository } from "typeorm";
import { RegistroFrequencia } from "./registro-frequencia.entity";

@EntityRepository(RegistroFrequencia)
export class RegistroFrequenciaRepository extends Repository<RegistroFrequencia>{ }