import { Injectable, ConflictException } from '@nestjs/common';
import { DiretorEscola } from './diretor-escola.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DiretorEscolaRepository } from './diretor-escola.repository';


@Injectable()
export class DiretorEscolaService {
  constructor(@InjectRepository(DiretorEscolaRepository) private diretorEscolaRepository: DiretorEscolaRepository) { }

  public inserir(diretores: number[], escolas: number[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const diretoresEscolas = new Array<DiretorEscola>();
      diretores.forEach(diretor => {
        escolas.forEach(escola => {
          const diretorEscola = new DiretorEscola();
          diretorEscola.dir_id = diretor;
          diretorEscola.esc_id = escola;
          diretoresEscolas.push(diretorEscola);
        });
      });
      let contaInseridos = 0;
      diretoresEscolas.forEach(diretorEscola => {
        contaInseridos++;
        this.verificaExistencia(diretorEscola).then((existe => {
          if (!existe) {
            diretorEscola.save().then((novoDiretorEscola => {
              if (contaInseridos == diretoresEscolas.length) {
                resolve();
              }
            }));
          } else {
            if (contaInseridos == diretoresEscolas.length) {
              resolve();
            }
          }
        }));
      });
    });
  }

  public verificaExistencia(diretorEscola: DiretorEscola): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.diretorEscolaRepository
        .find({ where: { dir_id: diretorEscola.dir_id, esc_id: diretorEscola.esc_id } })
        .then((diretoresEscolas: DiretorEscola[]) => {
          if (diretoresEscolas.length != 0) {
            resolve(true)
          } else {
            resolve(false);
          }
        });
    });
  }

}

