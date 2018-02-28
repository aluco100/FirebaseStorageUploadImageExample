import {Injectable} from '@angular/core';
import { ActionSheetController, Platform } from 'ionic-angular';
import { PermissionsService } from './permission.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

declare var cordova: any;

@Injectable()
export class ImageService{

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform,
    private permissionsService: PermissionsService,
    private camera: Camera,
    private file: File,
    private filepath: FilePath,
  ){}

  /**
   * Abrir el actionsheet de la galeria de fotos o camara
   * @return {void}
   */
  openActionSheet(){
    return new Promise((fulfill,reject)=>{
      let actionSheet = this.actionSheetCtrl.create({
       title: 'Agregar foto',
       buttons: [
         {
           text: 'Cámara',
           handler: () => {
             this.permissionsService.checkCameraPermissions().then(permissionOk =>{
               if(permissionOk){
                 this.takePicture(this.camera.PictureSourceType.CAMERA).then(imageName => {
                   fulfill(imageName);
                 }).catch(error => reject(error));
               }
             });
           }
         },
         {
           text: 'Librería de fotos',
           handler: () => {
             this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY).then(imageName => {
               fulfill(imageName);
             }).catch(error => reject(error));
           }
         },
         {
           text: 'Cancelar',
           role: 'cancel',
           handler: () => {
             return fulfill(null);
           }
         }
       ]
     });
     actionSheet.present();
    });

  }

  /**
   * Obtencion de foto mediante la galería o la cámara
   * @param  {any}       sourceType
   * @return {Promise<any>}
   */
  private takePicture(sourceType):Promise<any>{
    //Create Options for camera
    return new Promise((fulfill,reject)=>{
      let options: CameraOptions = {
          quality: 100,
          sourceType: sourceType,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          saveToPhotoAlbum: false,
          targetWidth: 800,
          targetHeight: 1200,
          correctOrientation: true
        };
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {

      fulfill(this.dataURItoBlob('data:image/jpeg;base64,' + imagePath));

        }, (err) => {
          console.log(err);
          reject(err);
        });

    });
  }

  /**
   * Convertir la data de la imagen a blob
   * @param  dataURI [description]
   */
  dataURItoBlob(dataURI) {
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  };

  /**
   * Creación del nombre del archivo
   * @return {string}
   */
  public createFileName(){
    var d = new Date(),
    n = d.getTime(),
    newFileName = 'temp'+  n + ".jpg";
    return newFileName;
  }
}
