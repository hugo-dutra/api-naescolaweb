export class Utils {

  /**
   * Cria abreviatura com strings iniciais
   * @param termoCompleto
   */
  public abreviarStringComIniciais(termoCompleto: string): string {
    let termoAbreviado = "";
    let palavras = termoCompleto.split(' ');
    for (let i = 0; i < palavras.length; i++) {
      termoAbreviado += palavras[i].substr(0, 1);
    }
    return termoAbreviado;
  }

  /**
   * Extrai substring
   * @param termoCompleto
   * @param tamanho
   */
  public extrairSubString(termoCompleto: string, tamanho: number): string {
    return termoCompleto.substr(0, tamanho);
  }

  /**
   * Verifica se campo informado e inteiro e tenta fazer o parse. Caso de falha, retorna valor padrao
   * @param str
   * @param defaultValue
   */
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

  /**
   * Elimina valores repetidos de objeto array.
   * @param arrayAlvo
   * @param campo
   */
  public eliminaValoresRepetidos(arrayAlvo: Object[], campo: string): Object[] {
    return Array.from(new Set(arrayAlvo.map(a => a[campo])))
      .map(id => {
        return arrayAlvo.find(a => a[campo] == id);
      });
  }

  public eliminaValoresRepetidosCampos(arrayAlvo: Object[], campo1: string, campo2: string): Object[] {
    return Array.from(new Set(arrayAlvo.map(a => a[campo1])))
      .map(id => {
        return arrayAlvo.find(a => a[campo1] == id);
      })
      .map(id2 => {
        return arrayAlvo.find(b => b[campo2] == id2);
      })
  }

}