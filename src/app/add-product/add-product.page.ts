import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetOptions } from '@capacitor/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { IonDatetime, NavController } from '@ionic/angular';
import { CartService } from '../services/productInfo.service';
import { Events } from '../services/event.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  constructor(
    private event: Events,
    private imagePicker: ImagePicker,
    private router: Router,
    private cartService: CartService,
    public navctrl: NavController) { }

  name: string = "";

  ngOnInit() {
  }

  register(form) {
    console.log("Registration form",form.value)

    if (form.value.category == "Yoga") {
      form.value.category = "0e56a1a9-3951-41e0-bd7b-b92ea7a67c9d"
    } else if (form.value.category == "HIIT") {
      form.value.category = "5d6e1b05-b798-4ff4-94cf-8cd31d12cdc8"
    } else {
      form.value.category = "114f47d8-5dbc-4300-9e12-09b379853471"
    }

    let product = {
      Name: form.value.name,
      Description: form.value.description,
      Price: form.value.price,
      Picture: "xx",
      CategoryFk: form.value.category,
      StartDate: form.value.startTime,
      EndDate: form.value.endtime
    }

    let schedule = {
      schedulerName: "dummy",
      schedulerDescription: "dummy",
      startDate: form.value.startTime,
      endDate: form.value.endtime,
      productName: form.value.name,
      productDescription: form.value.description,
      productId: ""
    }

    this.cartService.addProduct(product).then(data => {
      schedule.productId = data.toString()
      console.log("Product ID mapped from product table:", schedule.productId)
    }).then(data => { this.cartService.addSchedule(schedule);}

    ).then(data => {
      console.log("data after adding product:", data);
      this.event.publish("Publish");
      this.router.navigate(['tabs']);
    })

  }

  return() {
    
    this.navctrl.navigateBack('tabs');
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
