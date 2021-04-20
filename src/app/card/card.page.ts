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
    photo: ""
  }
  //public productName = "";
  //public productDescription = "";
  //public dateTime = "";

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {

      console.log(params)
      this.product.productName = params.name;
      this.product.productDescription = params.description,
      this.product.dateTime = "",
        this.product.price = params.price
      this.product.photo = params.photo

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

  addProduct(product) {

    this.cartService.addProduct(product);

  }

  returnToMainMenu() {
    this.router.navigate(['']);
  }


}
