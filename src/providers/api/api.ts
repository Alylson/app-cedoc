import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from "../config/config";
import { Storage } from '@ionic/storage';

@Injectable()
export class ApiProvider {

  public logged:boolean;

  constructor(public httpClient: HttpClient, public config:ConfigProvider, private storage: Storage) {
  }

  getTimeline(){
    return this.httpClient.get('http://'+this.config.ip+':'+this.config.port+'/timeline');
  }

  getNoticia(pk){
    return this.httpClient.get('http://'+this.config.ip+':'+this.config.port+'/noticia?pk='+pk);
  }

  getEntidades(){
    return this.httpClient.get('http://'+this.config.ip+':'+this.config.port+'/entidade');
  }

  getEntidadesPorCategoria(categoria){
    return this.httpClient.get('http://'+this.config.ip+':'+this.config.port+'/entidade?categoria='+categoria);
  }

  getCategorias(){
    return this.httpClient.get('http://'+this.config.ip+':'+this.config.port+'/categoria');
  }

  auth(userEmail, userSenha){
    let body = {
      email: userEmail,
      senha: userSenha
    };
    return this.httpClient.post('http://'+this.config.ip+':'+this.config.port+'/auth', body,
      {observe: 'response'});
  }

  logout(){
    this.storage.set('AuthToken', null);
    this.storage.set('Logged', false)
    this.logged = false;
  }

  getUserInfo(){
    return new Promise((resolve, reject) => {
      this.storage.get('AuthToken').then((authToken) => {
        let body = {
          token: authToken
        };
        resolve(this.httpClient.post('http://'+this.config.ip+':'+this.config.port+'/user', body,
          {observe: 'response'}));
      });
    });
  }

  getFavoritesInfo(){
    return new Promise((resolve, reject) => {
      this.storage.get('Favorites').then((favorites) => {
        if(favorites == null) favorites = " ";
        let query = favorites.slice(1);
        resolve(this.httpClient.get('http://'+this.config.ip+':'+this.config.port+'/favorites?favs='+query));
      });
    });
  }

}
