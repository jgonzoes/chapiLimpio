import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { SubirPage } from "../subir/subir";
import { CargarFotoProvider } from "../../providers/cargar-foto/cargar-foto";
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hayMasImagenes: boolean= true;

  constructor(private modalCtr:ModalController,
              public _carFotoPrv:CargarFotoProvider,
              private socialSharing: SocialSharing ) {
              //Envia la primera
              this._carFotoPrv.crearPost("El titulo", "assets/imgs/chapilogo.png","ElnombreArchivo");
  }

  mostar_modal(){
    let modal = this.modalCtr.create( SubirPage );
    modal.present();
  }

  doInfinite(infiniteScroll) {
    console.log("Empiesa tarea de cargar fotos");
    this._carFotoPrv.cargarImagenes().then(
      ( hayMas:boolean )=> {
        console.log(hayMas);
        this.hayMasImagenes = hayMas;
        infiniteScroll.complete();
      }
    );
  }

  compartir( post:any ){
    this.socialSharing.shareViaFacebook( post.titulo, post.img, post.img )
      .then( ()=>{} ) // se pudo compartir
      .catch( ()=>{} ) // si sucede un error
  }

}
