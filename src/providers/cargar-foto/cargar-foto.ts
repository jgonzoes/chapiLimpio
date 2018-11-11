import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as firebase from 'firebase'
import 'rxjs/add/operator/map';

@Injectable()
export class CargarFotoProvider {
  imagenes: ArchivoSubir[] = [];
  lastKey: string = null;

  coleccion: string = "/chapiBasura";

  constructor(public toastCtrl: ToastController,
              public angFireBase: AngularFireDatabase) {
   // this.cargarUltimaKey().subscribe( ()=> this.cargarImagenes())
    
  }

  cargarImagenFirebase( archivo:ArchivoSubir ){
    let promesa = new Promise( ( resolve, reject) =>{
      this.mostarMensaje('Cargando imagen ...');

      //firebase stoage
      let fireBaseRef = firebase.storage().ref();
      let nombreFoto = new Date().valueOf().toString();
      let uploadTask: firebase.storage.UploadTask =
        fireBaseRef.child(`img/${ nombreFoto }`)
                  .putString( archivo.imagen, 'base64', { contentType: 'image/jpeg' }  );

         uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
            ()=>{ }, // cuanto se ha suvido
            ( error ) =>{
              console.error("Error en la carga");
              console.error(JSON.stringify( error ));
              this.mostarMensaje(JSON.stringify( error ));
              reject();
            },
            ()=>{
              console.log('Imagen cargada');
              this.mostarMensaje('Imagen cargada correctamente');
              
              let url = uploadTask.snapshot.downloadURL;
              this.crearPost( archivo.titulo, url, nombreFoto );

              resolve();
            }
          )
    });
    return promesa
  }
  
  private crearPost( titulo: string, url: string, nombreArchivo:string ){
    let post: ArchivoSubir = {
      imagen: url,
      titulo: titulo,
      key: nombreArchivo
    };
    console.log( JSON.stringify(post) );

     //this.angFireBase.list(this.coleccion).push(post) //lo crea el solo
    this.angFireBase.object(`${ this.coleccion }/${ nombreArchivo }`).update(post);
    this.imagenes.push( post );
  }

  private cargarUltimaKey(){

    let listaDB = this.angFireBase.list(this.coleccion, ref=> ref.orderByKey().limitToLast(1) )
              .valueChanges()
              .map( (FotoCargada:any) =>{
                this.lastKey = FotoCargada[0].key;
                this.imagenes.push( FotoCargada[0] );
              });
              console.log("el servicio " + this.lastKey);
    
    return listaDB;
  }

  cargarImagenes(){
    return new Promise( (resolve, reject)=>{
      this.angFireBase.list(this.coleccion,
        ref=> ref.limitToLast(3)
                 .orderByKey()
                 .endAt( this.lastKey )
       ).valueChanges()
        .subscribe(  (posts:any)=>{
          posts.pop();
          if( posts.length == 0 ){
            console.log('Ya no hay más registros');
            resolve(false);
            return;
          }

          this.lastKey = posts[0].key;
          for( let i = posts.length-1;  i >=0; i-- ){
            let post = posts[i];
            this.imagenes.push(post);
          }
          resolve(true);
        });
    });
  }

  mostarMensaje( mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}

interface ArchivoSubir{
  titulo: string,
  imagen: string
  key?: string
}