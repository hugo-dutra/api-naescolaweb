import { Controller, Get, Param } from '@nestjs/common';
import { SistemaService } from './sistema.service';


@Controller('sistema')
export class SistemaController {
  constructor(private sistemaService: SistemaService) { }

  @Get('/listar-campos/:tabela')
  public listarCampos(@Param('tabela') tabela: string): Promise<any[]> {
    return this.sistemaService.listarCampos(tabela);
  }

  @Get('/dados-campos-tabela/:campos/:esc_id/:ordem')
  public listarCamposTabela(@Param('campos') campos: string, @Param('esc_id') esc_id: number, @Param('ordem') ordem: string): Promise<any[]> {
    return this.sistemaService.listarCamposTabela(campos, esc_id, ordem);
  }

  @Get('/pcf')
  public pegarConfiguracaoProjetoFirebase(): Promise<any> {
    return new Promise((resolve) => {
      const config = 'U2FsdGVkX1/QYk62uvyqACEWOZ/gQBPAM7fjE1hfktCb3yzxwrkeKb0WN5UYqn7F+Tlz9dfjjXVf+WP1PyZXHY7c6OOcm6XqJZOFx8G0BoXern3NNFQfN8NhFP8Ij3SlIatGVroFRyotjaxM0EzI/ZrC5OLiiK0qUtPrs+t+Xt2mZUK0W++jqBMPpaIgtF4c055jzhrgyo9OxUjMWKTcO/aTOctrOH+Hub+OZ7jOk8ASm/tMnKXMjH9mQigQmQRm2vjwLwLpW1H8GBPtjtkd1HPJlf2xf5NFzJymSlf9yBVQ3AEUr8sOYwTnh3kmPAezQTqGRrIhrbnmc4w1ORcjmea3t+HKPe/AUhqx9NpkASfBDXbaa3icDlSRD6wwq202K+Td1f2AeyKv3i/VZLGpJg==';
      resolve({ config });
    })
  }

  @Get('/ldai')
  public listarDadosAcessoIntegracao(): Promise<any> {
    return new Promise((resolve) => {
      const config = 'U2FsdGVkX19G6ZU4zrLsxvei4MHxYaK9bIZ2L+Kwjbil6YdIcGej2zIf1vbDIpGsOEu6JU2JaoqozJqZhmIU/5e4IYnMZV0x+7pOWir7jce67Lm2kUd9o5vMEqcdNHsQ';
      resolve({ config });
    })
  }

  @Get('/phi')
  public pegarUrlHostIntegracao(): Promise<any> {
    return new Promise((resolve) => {
      const config = 'U2FsdGVkX182sX6wWUNM4WCQje5GgpcEm4fKvreHXYe2xcEJvSentlHf4RkL6lazb+DaRILqjAQiFVsUyExtW54323RdsU9x66+yfr9SvgA=';
      resolve({ config });
    })
  }

  @Get('/phti')
  public pegarUrlHostTokenIntegracao(): Promise<any> {
    return new Promise((resolve) => {
      const config = 'U2FsdGVkX1+r4HHQV8ZFHqHhLaSWOCCv+8qoL15OX9B18PDDXbul8j+r5Do05zAfeI7BBHq+iIYCAdHs9R0fawfXyNwoob6LN8WXmzkO+JYY1ksCZE1yg4Ng/QaWQsz6Q3qZUk7jd9kD9b6zZ7zc+A==';
      resolve({ config });
    })
  }




}
