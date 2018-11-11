import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubirPage } from '../pages/subir/subir';

import { SocialSharing } from '@ionic-native/social-sharing';

import { PipesModule } from "../pipes/pipes.module";
import { IonicStorageModule } from '@ionic/storage';

import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { CargarFotoProvider } from '../providers/cargar-foto/cargar-foto';
import { LoginPage } from '../pages/login/login';
import { UsuarioProvider } from '../providers/usuario/usuario';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';



export const firebaseConfig = {
  apiKey: "AIzaSyCA5GT3tMPAVL62njAd4lEJQ-ytmWXrpNU",
  authDomain: "chapilimpio-fb550.firebaseapp.com",
  databaseURL: "https://chapilimpio-fb550.firebaseio.com",
  projectId: "chapilimpio-fb550",
  storageBucket: "chapilimpio-fb550.appspot.com",
  messagingSenderId: "1033887005459"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubirPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubirPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    ImagePicker,
    CargarFotoProvider,
    SocialSharing,
    UsuarioProvider
  ]
})
export class AppModule {}
