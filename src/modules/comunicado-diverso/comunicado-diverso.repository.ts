import { Repository, EntityRepository } from "typeorm";
import { ComunicadoDiverso } from "./comunicado-diverso.entity";

@EntityRepository(ComunicadoDiverso)
export class ComunicadoDiversoRepository extends Repository<ComunicadoDiverso>{ }