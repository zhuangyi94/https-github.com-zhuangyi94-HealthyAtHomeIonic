import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetOptions } from '@capacitor/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { IonDatetime, NavController } from '@ionic/angular';
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
    private cartService: CartService,
    public navctrl: NavController) { }

  name: string = "";

  ngOnInit() {
  }

  register(form) {
    console.log(form.value)

    if (form.value.category = "Yoga") {
      form.value.category = "0e56a1a9-3951-41e0-bd7b-b92ea7a67c9d"
    } else if (form.value.category = "HIIT") {
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
      productId: "037bb049-76ed-4bdc-a8d4-55f79089c4e0"
    }

    this.cartService.addProduct(product).then(data => {

      console.log("product ID", data)
      schedule.productId = data.toString()
      console.log("product ID 2", schedule.productId)
    }).then(data => { this.cartService.addSchedule(schedule);}

    ).then(data => {
      console.log("after scheudle", data);
      this.router.navigate(['tabs']);
    })

    //this.cartService.addSchedule(schedule).then(data => {

    //  //this.router.navigate(['tabs']);
    //});

    //this.cartService.addProduct(product).then(data => {
    //  console.log("data",data)
    //  this.navctrl.navigateBack('tabs');
    // //this.router.navigate(['tabs']);
    //  //var productid = "037bb049-76ed-4bdc-a8d4-55f79089c4e0"

    //  //let schedule = {
    //  //  schedulerName: "dummy",
    //  //  schedulerDescription: "dummy",
    //  //  startDate: form.value.startdate,
    //  //  endDate: form.value.enddate,
    //  //  productName: form.value.productName,
    //  //  productId: "037bb049-76ed-4bdc-a8d4-55f79089c4e0"
    //  //}
    //  //this.cartService.addSchedule(schedule);

    //})

  }

  return() {
    //this.router.navigate(['tabs']);
    this.navctrl.navigateBack('tabs');
    //this.navctrl.setRoot();
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
