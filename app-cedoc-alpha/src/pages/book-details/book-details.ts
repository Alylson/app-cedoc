import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-book-details',
  templateUrl: 'book-details.html',
})
export class BookDetailsPage {

  livro:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.livro = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookDetailsPage');
  }

}
