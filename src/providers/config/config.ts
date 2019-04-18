import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {

  /* Configurações de conexão com o back-end */
  ip:any = "52.67.177.141";
  port:any = 3000;

  constructor(public http: HttpClient) {
  }

}
