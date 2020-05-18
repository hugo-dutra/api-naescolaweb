import { Repository, EntityRepository } from "typeorm";
import { PendenciaCarteirinha } from "./pendencia-carteirinha.entity";

@EntityRepository(PendenciaCarteirinha)
export class PendenciaCarteirinhaRepository extends Repository<PendenciaCarteirinha>{ }