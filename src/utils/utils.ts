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

  public TryParseInt(str: any, defaultValue: any) {
    var retValue = defaultValue;
    if (str !== null) {
      if (str.length > 0) {
        if (!isNaN(str)) {
          retValue = parseInt(str);
        }
      }
    }
    return retValue;
  }

}