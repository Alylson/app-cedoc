import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";

@IonicPage()
@Component({
  selector: 'page-noticia-details',
  templateUrl: 'noticia-details.html',
})
export class NoticiaDetailsPage {

  noticia:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: UtilsProvider) {
    this.noticia = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticiaDetailsPage');
  }

}
