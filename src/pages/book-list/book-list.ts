import { Component } from '@angular/core';
import {Events, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {UtilsProvider} from "../../providers/utils/utils";

@IonicPage()
@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  public entidadesCache:any;
  public entidades:any;
  localSortType:any = 'NOME';

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
              public menu: MenuController, public events: Events, public utils: UtilsProvider) {

    /*
     * Faz um Request das informações ao Back-end, recebendo
     * um objeto JSON como response.
     */
    if(this.navParams.get('carregarTodos')){
      api.getEntidades().subscribe( (res) => {
        this.entidadesCache = res;
        this.entidades = res;
        this.sortBooks(this.localSortType);
      });
    } else if(this.navParams.get('categoria') != null) {
      api.getEntidadesPorCategoria(this.navParams.get('categoria')).subscribe( (res) => {
        this.entidadesCache = res;
        this.entidades = res;
        this.sortBooks(this.localSortType);
      });
    }

    /* Escuta os events e define callbacks. */
    events.subscribe('function:sortBooks', (sortType) => {
      this.localSortType = sortType;
      this.sortBooks(this.localSortType);
    });
  }

  ionViewWillEnter() {
    /* Ativa o Menu da pagina. */
    this.menu.enable(true, 'bookMenu');
    this.menu.enable(false, 'homeMenu');
  }

  abrirDetalhesLivro(item){
    this.navCtrl.push('BookDetailsPage', {item: item});
  }

  filtrarEntidades(ev){
    this.entidades = this.entidadesCache;
    let query = ev.target.value;
    if (query && query.trim() != '') {
      this.entidades = this.entidadesCache.filter((item) => {
        return (item.c_nome.concat(item.c_autor).toLowerCase().indexOf(query.toLowerCase()) > -1);
      })
    }
  }

  sortBooks(sortType){
    switch(sortType){
      case 'NOME':
          this.entidades.sort((a, b) => {return a.c_nome < b.c_nome ? -1 : 1;});
          break;
      case 'AUTOR':
          this.entidades.sort((a, b) => {return a.c_autor < b.c_nome ? -1 : 1;});
          break;
      case 'DATA_PUBLI':
          this.entidades.sort((a, b) => {return a.d_publi < b.d_publi ? -1: 1;}); //<<<<<< Arrumar
          break;
      case 'DATA_POST':
          this.entidades.sort((a, b) => {return a.n_datapost - b.n_datapost;});
          break;
      case 'DISP_DOWNLOAD':
          this.entidades.sort((a, b) => {return a.c_dispebook == b.c_dispebook ? -1 : 1;});
          break;
      case 'DISP_BIBLIOTECA':
          this.entidades.sort((a, b) => {return a.c_displocal == b.c_displocal ? -1 : 1;});
          break;
    }
  }

}
