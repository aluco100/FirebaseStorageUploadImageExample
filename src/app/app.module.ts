import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { Diagnostic } from '@ionic-native/diagnostic';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { ImageResizer } from '@ionic-native/image-resizer';

import { ImageService } from "../services/image.service";
import { PermissionsService } from "../services/permission.service";

export const firebaseConfig = {
  apiKey: "AIzaSyBEG-1DEq5dQQ908gFeJaqZOvVKTq4fxfo",
  authDomain: "appnews-166621.firebaseapp.com",
  databaseURL: "https://appnews-166621.firebaseio.com",
  projectId: "appnews-166621",
  storageBucket: "appnews-166621.appspot.com",
  messagingSenderId: "150837716036"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImageService,
    PermissionsService,
    Diagnostic,
    Camera,
    File,
    FilePath,
    ImageResizer,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
