import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/productInfo.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  public product = {
    productName: "",
    productDescription: "",
    dateTime: "",
    price: "",
    photo: "",
    startDate: "",
    endDate: ""
  }
  //public productName = "";
  //public productDescription = "";
  //public dateTime = "";

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {

      console.log("params",params)
      this.product.productName = params.productName;
      this.product.productDescription = params.productDescription,
      this.product.startDate = "2021-04-25 10:00",
      this.product.endDate = "2021-04-26 10:00",
      this.product.price = params.productPrice,
      this.product.photo = params.productPhoto

      console.log(this.product);
      
      //if (params && params.special) {
      //  //store the temp in data
      //  this.data = JSON.parse(params.special);
      //}
    })
  }

  constructor(public activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router  ) {

    //this.activatedRoute.queryParams.subscribe((res) => {
    //  console.log(res);
    //});
  }

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    //this.swingStack.throwin.subscribe((event: DragEvent) => {
    //  event.target.style.background = '#ffffff';
    //});

  }

  subscribeProduct(product) {

    this.cartService.addProduct(product);

  }

  btn_txt = 'Subscribe';
  check() {
    if (this.btn_txt == 'Check') {
      //do some logic
      this.btn_txt = 'Subscribed';
    } else {
      console.log('go to next page');
    }
  }

  returnToMainMenu() {
    this.router.navigate(['tabs']);
  }


}
