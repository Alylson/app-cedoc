import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { NavPage } from "../nav/nav";
import { ApiProvider } from "../../providers/api/api";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email:any;
  senha:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
              private storage: Storage, public events: Events) {
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.storage.get("Logged").then((logged) => {
      if(logged) this.navCtrl.setRoot(NavPage);
    });
  }

  login(){
        this.navCtrl.setRoot(NavPage);
  }

}