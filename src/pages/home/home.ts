import { Component } from '@angular/core';
import { NavController, normalizeURL } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { ImageService } from "../../services/image.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public photo;

  constructor(public navCtrl: NavController,
    private storage: AngularFireStorage,
    private imageService: ImageService) {
  }

  upload() {
    //aqui subir la foto
    //vamos a obviar como si hubiera un chat .... chat 1
    this.imageService.openActionSheet().then(async(image: string) => {
      console.log("Comienza subida");
      console.log(image);
      let ref = this.storage.ref('chat1/img1.jpg');
      await ref.put(image);
      ref.getDownloadURL().subscribe(url => {
        console.log(url);
        this.photo = url;
      });
    }).catch(error => {
      console.log("ERROR: " + JSON.stringify(error));
    })
  }

}
