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
    endDate: "",
    userId: "",
    productId: ""
  }

  public subId = ""
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
      this.product.userId = params.userId,
        this.product.productId = params.productId

      this.cartService.checkSubscription("f687a69a-0abd-4e9f-ae51-47b8a34b910a", this.product.productId).then(
        result => {
          console.log("final result", result)
          if (result) {
            document.getElementById('sub').innerHTML = 'Subscribed';
            this.subId = result.toString();
          } else {
            document.getElementById('sub').innerHTML = 'Subscribe'
          }
        }
      );

      console.log(this.product);

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

    console.log("product", product)
    console.log("should we sub", document.getElementById('sub').innerHTML)
    let selection = document.getElementById('sub').innerHTML;
    console.log("selection value:" + selection + "xxx")
    if (selection == " Subscribe ") {
      console.log("sub here 1")
      this.cartService.addSubscription(product).then(data => {

       console.log("after sub", data)
        this.subId = data.toString();
        console.log(this.subId)
      });
    } else {
      console.log("sub here 2", this.subId)
      this.cartService.removeSubscription(this.subId).then(data => {

        console.log("after unsub", data)
      });
    }



    if (document.getElementById('sub').innerHTML == 'Subscribed') {
      document.getElementById('sub').innerHTML = 'Subscribe';
      //document.body.style.background = 'red';
      document.getElementById('sub').style.color = 'Primary';
    } else {
      document.getElementById('sub').innerHTML = 'Subscribed';
      //document.body.style.background = 'green';
      document.getElementById('sub').style.color = 'Secondary';
    }

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
