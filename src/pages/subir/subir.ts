import { Component } from '@angular/core';
import { ViewController } from "ionic-angular";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { CargarFotoProvider } from "../../providers/cargar-foto/cargar-foto";

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html'
})
export class SubirPage {
  titulo: string = "";
  imagenPre: string = "";
  imagen64: string;

  constructor(private viewCtr: ViewController,
              private camara: Camera,
              private imagePicker: ImagePicker,
              public _carFotoPrv:CargarFotoProvider) {
  }

  cerrar_modal(){
    this.viewCtr.dismiss();
  }

  usar_camara(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camara.DestinationType.FILE_URI,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE
    }
    
    this.camara.getPicture(options).then((imageData) => {
      this.imagenPre = 'data:image/jpeg;base64,' + imageData;
      this.imagen64= imageData;
    }, (err) => {
     console.log("Error en la caara ", JSON.stringify(err))
    });
  }

  selectFoto(){
    let opciones:ImagePickerOptions  = {
      quality: 70,
      outputType: 1,
      maximumImagesCount: 1
    }

    this.imagePicker.getPictures(opciones).then((results) => {
      for (var i = 0; i < results.length; i++) {
          this.imagenPre = 'data:image/jpeg;base64,' + results[i];
          this.imagen64= results[i];
      }
    }, (err) => { console.error("Error en selector Fotos", JSON.stringify(err))});
  }

  reportar_Basura(){
    let fotoSubir = {
      titulo: this.imagen64,
      imagen: this.titulo
    }
    this._carFotoPrv.cargarImagenFirebase(fotoSubir)
      .then( ()=> this.cerrar_modal() );
  }

}
