import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from "ionic-angular";
import { Storage } from '@ionic/storage';

@Injectable()
export class UtilsProvider {

  public favoritesCache:String;

  constructor(public http: HttpClient, public platform: Platform, private storage: Storage) {
  }

  isOdd(num){
    return (num % 2) == 1;
  }

  formatDataPostagem(ms){
    let dataPost = Date.now() - Number(ms);
    let tm;
    if(dataPost < 60000){
      return ((dataPost % 60000) / 1000) + "s";
    } else if(dataPost < 3600000){
      return Math.floor(dataPost / 60000) + "m";
    } else if(dataPost < 86400000){
      return Math.floor(dataPost / 3600000) + "h";
    } else if(dataPost < 31556952000){
      tm = Math.floor(dataPost / 86400000) == 1 ?" dia":" dias";
      return Math.floor(dataPost / 86400000) + tm;
    } else if(dataPost >= 31556952000){
      tm = Math.floor(dataPost / 31556952000) == 1 ?" ano":" anos";
      return Math.floor(dataPost / 31556952000) + tm;
    }
  }

  filterHeight(){
    if      (this.platform.is('android')) return 'android-height';
    else if (this.platform.is('ios')) return 'ios-height';
    else if (this.platform.is('windows')) return 'wp-height';
    else return '';
  }

  filterListRadio(){
    if      (this.platform.is('android')) return 'android';
    else if (this.platform.is('ios')) return 'ios';
    else return '';
  }

  toggleFavorito(fav){
    this.storage.get('Favorites').then((favorites) => {
      if(favorites == null) favorites = '';
      if(favorites.indexOf(fav) == -1){
        this.storage.set('Favorites', favorites+','+fav);
        this.favoritesCache = favorites+','+fav;
      } else {
        this.storage.set('Favorites', favorites.replace(','+fav, ''));
        this.favoritesCache = favorites.replace(','+fav, '');
      }
    });
  }

}
