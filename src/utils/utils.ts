export class Utils {

  public abreviarStringComIniciais(termoCompleto: string): string {
    let termoAbreviado = "";
    let palavras = termoCompleto.split(' ');
    for (let i = 0; i < palavras.length; i++) {
      termoAbreviado += palavras[i].substr(0, 1);
    }
    return termoAbreviado;
  }

  public extrairSubString(termoCompleto: string, tamanho: number): string {
    return termoCompleto.substr(0, tamanho);
  }

}