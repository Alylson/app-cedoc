import { Component } from '@angular/core';
import {IonicPage, LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {UtilsProvider} from "../../providers/utils/utils";

@IonicPage()
@Component({
  selector: 'page-books',
  templateUrl: 'books.html',
})
export class BooksPage {

  categorias:any;
  entidadesLength:any;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
              public menu: MenuController, public loadingCtrl: LoadingController, public utils: UtilsProvider) {

      this.categorias = null;
      this.entidadesLength = null;

      this.loading = this.loadingCtrl.create({
        content: 'Carregando'
      });
      this.loading.present();

      /*
       * Faz um Request das informações ao Back-end, recebendo
       * um objeto JSON como response.
       */
      this.api.getEntidades().subscribe( (res:any) => {
        this.entidadesLength = res.length;
        this.loading.dismiss();
      });
      this.api.getCategorias().subscribe( (res) => {
        this.categorias = res;
      });
  }

  ionViewCanEnter() {
    console.log(" ion view can enter");
    //return new Promise((resolve, reject) => {
    //});
  }

  ionViewWillEnter() {
    console.log(" ion view will enter");
    /* Ativa o Menu da pagina. */
    this.menu.enable(true, 'bookMenu');
    this.menu.enable(false, 'homeMenu');
  }

  ionViewDidEnter(){

  }

  abrirTodos(){
    this.navCtrl.push('BookListPage', {carregarTodos: true});
  }

  abrirCategoria(ctg){
    this.navCtrl.push('BookListPage', {categoria: ctg});
  }

  transparentActive:boolean = false;
  headerActive:boolean = false;

  onScroll(event){

    if(event.scrollTop < 5){
      if(!this.transparentActive){
        let classN = document.getElementById('dynamicHeader').className;
        document.getElementById('dynamicHeaderBook').className = classN.replace(/ h-active/g, '');
        this.transparentActive = true;
        this.headerActive = false;
      }
    } else if(event.scrollTop > 5){
      if(!this.headerActive){
        document.getElementById('dynamicHeaderBook').className += ' h-active';
        this.transparentActive = false;
        this.headerActive = true;
      }
    }
  }

}
