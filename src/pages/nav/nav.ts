import {Component, Injectable} from '@angular/core';
import {App, Events, IonicPage, MenuController, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {BooksPage} from "../books/books";
import {FavoritesPage} from "../favorites/favorites";
import {ProfilePage} from "../profile/profile";
import {ApiProvider} from "../../providers/api/api";
import {UtilsProvider} from "../../providers/utils/utils";
import {LoginPage} from "../login/login";

@Injectable()
@IonicPage()
@Component({
  selector: 'page-nav',
  templateUrl: 'nav.html'
})
export class NavPage {

  userInfos:any;

  sortType:any = 'NOME';

  homeRoot = HomePage;
  booksRoot = BooksPage;
  favoritesRoot = FavoritesPage;
  profileRoot = ProfilePage;

  constructor(public navCtrl: NavController, public menu: MenuController, public api: ApiProvider,
              public events: Events, public utils: UtilsProvider, public appCtrl: App) {
    this.api.getUserInfo().then((resolve:any) => {
      resolve.subscribe((res:any) => {
        if(res.status == 200){
          this.userInfos = res.body;
        }
      });
    });
  }


  irParaHome(tabs){
    tabs.select(0);
    this.menu.close('homeMenu');
  }

  irParaCategorias(tabs){
    tabs.select(1);
    this.menu.close('bookMenu');
  }

  irParaProfile(tabs){
    tabs.select(3);
    this.menu.close('homeMenu');
  }

  logout(){
    this.api.logout();;
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }

  callSortBooks(){
    this.events.publish('function:sortBooks', this.sortType);
  }

}
