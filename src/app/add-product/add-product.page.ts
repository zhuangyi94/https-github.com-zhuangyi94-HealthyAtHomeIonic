import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetOptions } from '@capacitor/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { IonDatetime } from '@ionic/angular';
import { CartService } from '../services/productInfo.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  //description: Text;
  //starttime: IonDatetime;
  //endtime: IonDatetime;
  //price: Text;


  constructor(private imagePicker: ImagePicker,
    private router: Router,
    private cartService: CartService  ) { }

  name: string = "";

  ngOnInit() {
  }

  register(form) {
    console.log(form.value)
    let product = {
      Name: form.value.name,
      Description: form.value.description,
      Price: form.value.price,
      CategoryFk: form.value.category,
      StartDate: form.value.startTime,
      EndDate: form.value.endtime
    }

    let schedule = {
      schedulerName: "dummy",
      schedulerDescription: "dummy",
      startDate: form.value.startTime,
      endDate: form.value.endtime,
      productName: form.value.productName,
      productId: "037bb049-76ed-4bdc-a8d4-55f79089c4e0"
    }
    this.cartService.addSchedule(schedule).then(data => {

      this.router.navigate(['tabs']);
    });

    this.cartService.addProduct(product).then(data => {
      console.log("data")
      //var productid = "037bb049-76ed-4bdc-a8d4-55f79089c4e0"

      //let schedule = {
      //  schedulerName: "dummy",
      //  schedulerDescription: "dummy",
      //  startDate: form.value.startdate,
      //  endDate: form.value.enddate,
      //  productName: form.value.productName,
      //  productId: "037bb049-76ed-4bdc-a8d4-55f79089c4e0"
      //}
      //this.cartService.addSchedule(schedule);

    })

  }

  return() {
    this.router.navigate(['tabs']);
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
