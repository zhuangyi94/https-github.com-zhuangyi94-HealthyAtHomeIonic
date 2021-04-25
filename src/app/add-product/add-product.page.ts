import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActionSheetOptions } from '@capacitor/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  constructor(private imagePicker: ImagePicker) { }

  name: string = "";

  ngOnInit() {
  }

  addProduct() {
    console.log(this.name);
  }

  register(form) {
    console.log(form)
  }

  getImage() {
    let options = {
      maximumImagesCount: 1//select number of image default is 15
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => {
      console.log("error: " + err);
    });
  }

}
