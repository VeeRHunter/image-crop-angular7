import { Component } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';

@Component({
  selector: 'app-image-cropping',
  templateUrl: './image-cropping.component.html',
  styleUrls: ['./image-cropping.component.css']
})
export class ImageCroppingComponent {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperReady = false;



  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.cropperReady = true;
  }
  loadImageFailed() {
    console.log('Load failed');
  }

}
