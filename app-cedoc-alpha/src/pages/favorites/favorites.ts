import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";
import {ApiProvider} from "../../providers/api/api";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  localFavorites:String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: UtilsProvider,
              public api: ApiProvider, public storage: Storage, public menu: MenuController) {
  }

  ionViewWillEnter(){
    this.menu.enable(false, 'bookMenu');
    this.menu.enable(true, 'homeMenu');
    this.api.getFavoritesInfo().then((resolve:any) => {
      resolve.subscribe((res) => {
        this.localFavorites = res;
      });
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FavoritesPage');
  }

  abrirDetalhesLivro(item){
    this.navCtrl.push('BookDetailsPage', {item: item});
  }

  transparentActive:boolean = false;
  headerActive:boolean = false;

  onScroll(event){
    if(event.scrollTop < 5){
      if(!this.transparentActive){
        let classN = document.getElementById('dynamicHeaderFavorites').className;
        document.getElementById('dynamicHeaderFavorites').className = classN.replace(/ h-active/g, '');
        this.transparentActive = true;
        this.headerActive = false;
      }
    } else if(event.scrollTop > 5){
      if(!this.headerActive){
        document.getElementById('dynamicHeaderFavorites').className += ' h-active';
        this.transparentActive = false;
        this.headerActive = true;
      }
    }
  }


}
