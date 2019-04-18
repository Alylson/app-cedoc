import { Component } from '@angular/core';
import { Events, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import { ApiProvider } from "../../providers/api/api";
import { UtilsProvider } from "../../providers/utils/utils";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  timeline:any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiProvider,
              public menu: MenuController, public utils: UtilsProvider, public events: Events,
              public storage: Storage) {

    this.storage.get('Favorites').then((favorites) => {
      if(favorites == null) favorites = '';
      this.utils.favoritesCache = ''+favorites;
    });

    this.timeline = null;

    api.getTimeline().subscribe( (res) => {
      this.timeline = res;
    });
  }

  ionViewWillEnter() {
    this.menu.enable(false, 'bookMenu');
    this.menu.enable(true, 'homeMenu');
  }

  ionViewDidEnter() {
    this.events.publish('home:colorChange', true);
  }

  ionViewDidLeave() {
    this.events.publish('home:colorChange', false);
  }

  transparentActive:boolean = false;
  headerActive:boolean = false;

  onScroll(event){
    if(event.scrollTop < 5){
      if(!this.transparentActive){
        let classN = document.getElementById('dynamicHeader').className;
        document.getElementById('dynamicHeader').className = classN.replace(/ h-active/g, '');
        this.transparentActive = true;
        this.headerActive = false;
      }
    } else if(event.scrollTop > 5){
      if(!this.headerActive){
        document.getElementById('dynamicHeader').className += ' h-active';
        this.transparentActive = false;
        this.headerActive = true;
      }
    }
  }

  abrirDetalhesNoticia(item){
    this.navCtrl.push('NoticiaDetailsPage', {item: item});
  }

  abrirDetalhesLivro(item){
    this.navCtrl.push('BookDetailsPage', {item: item});
  }

}
