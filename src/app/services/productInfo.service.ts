import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { __param } from 'tslib';
import { promise } from 'protractor';
import { BehaviorSubject, from, Observable, Subject  } from 'rxjs';
import { map, tap, switchMap,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public productList = [];
  

  public getRequest(){

     console.log("service step 1");
     const headers = 
       new HttpHeaders({
         'Content-Type': 'application/json',
         "Access-Control-Allow-Origin": ["http://localhost:8100","http://localhost:3000"]
       });
     
    return new Promise<object>(resolve => {
      console.log("service step 2");
         this.httpClient.get
           ('http://api.xiamaomi.com/product/search/%20'
           )
           .subscribe(data => {
             this.organizeData(data);
             resolve(data);
         }, err => {
               console.log(err);
               return (err);
         });
    });
    
     
  }

  public checkSubscription(token,productId) {

    console.log("sub step 1",token.id);
    //const headers =
    //  new HttpHeaders({
    //    'Content-Type': 'application/json',
    //    "Access-Control-Allow-Origin": ["http://localhost:8100", "http://localhost:3000"]
    //  });

    return new Promise<object>(resolve => {
      console.log("service step 2");
      this.httpClient.get
        ('http://api.xiamaomi.com/productSubscription/search/' + token.id
        )
        .subscribe(data => {
          let value = this.checkSub(data, productId);
          console.log("so values is", value)
          if (value != null) {
            console.log("its true",data)
            data = value;
            resolve(data)
          }
          else return false;
          console.log("sub details", data)
          
          resolve(data);
        }, err => {
          console.log(err);
          return (err);
        });
    });


  }

  checkSub(data, productID) {
    console.log("waht we gaet", data, productID)
    for (let i = 0; i < data.productSubscriptions.length; i++) {
      if ((data.productSubscriptions[i].productId == productID) && (data.productSubscriptions[i].isActive!=false)) {
        return data.productSubscriptions[i].productSubscriptionId;
      }

    }
    return null;
  }


  organizeData(productData) {

    //let productList = []

    let categoryYoga = {
      category: 'Yoga',
      expanded: true,
      products: []
    }

    for (let i = 0; i < productData.products.length; i++) {
      console.log(productData.products[i]); //use i instead of 0

      if (productData.products[i].categoryFk == "0e56a1a9-3951-41e0-bd7b-b92ea7a67c9d") {
        let list = {

          id: productData.products[i].id ,
          name: productData.products[i].name,
          price: productData.products[i].price,
          description: productData.products[i].description,
          startDate: productData.products[i].startDate,
          endDate: productData.products[i].endDate
        }
        categoryYoga.products.push(list);
      }
    }

    let categoryHIIT = {
      category: 'HIIT',
      products: []
    }

    for (let i = 0; i < productData.products.length; i++) {
      //console.log(productData.products[i]); //use i instead of 0

      if (productData.products[i].categoryFk == "5d6e1b05-b798-4ff4-94cf-8cd31d12cdc8") {
        console.log("same", productData.products.categoryFk)
        let list = {

          id: productData.products[i].id,
          name: productData.products[i].name,
          price: productData.products[i].price,
          description: productData.products[i].description,
          startDate: productData.products[i].startDate,
          endDate: productData.products[i].endDate
        }
        categoryHIIT.products.push(list);
      }
    }

    let categoryZumba = {
      category: 'Zumba',
      products: []
    }

    for (let i = 0; i < productData.products.length; i++) {
      //console.log(productData.products[i]); //use i instead of 0

      if (productData.products[i].categoryFk == "114f47d8-5dbc-4300-9e12-09b379853471") {
        console.log("same", productData.products.categoryFk)
        let list = {

          id: productData.products[i].id,
          name: productData.products[i].name,
          price: productData.products[i].price,
          description: productData.products[i].description,
          startDate: productData.products[i].startDate,
          endDate: productData.products[i].endDate
        }
        categoryZumba.products.push(list);
      }
    }

    this.productList = [categoryYoga, categoryHIIT, categoryZumba];

    console.log("complete organize", this.productList);
  }

  public productInfo =

    {
      "Name": "Yoga with Steven",
      "Description": "Yoga Class",
      "Price": 80,
      "Picture": "xx",
      "CategoryFk": "0e56a1a9-3951-41e0-bd7b-b92ea7a67c9d"
    }

  addProduct(product) {

    //product = {
    //  "Name": "Yoga with Tim",
    //  "Description": "Yoga Class",
    //  "Price": 80,
    //  "Picture": "xx",
    //  "CategoryFk": "0e56a1a9-3951-41e0-bd7b-b92ea7a67c9d",
    //  "StartDate": "2021-04-25T10:35:15.459+08:00",
    //  "EndDate": "2021-04-25T10:35:15.459+08:00"
    //}

    //const headers =
    //  new HttpHeaders({
    //    'Content-Type': 'application/json',
    //    "Access-Control-Allow-Origin": "http://localhost:8100"
    //  });
    //const headers = new HttpHeaders().set('Content-Type', 'application/json')
    //  .set('Accept', 'application/json')
    //  .set('responseType', 'text')
    //  .set('Access-Control-Allow-Origin', '*')
    //  .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');


    //var header = new Headers();
    //header.append('Content - Type', 'application / x - www - form - urlencoded; charset = UTF - 8');

    console.log("product", product)
    const params = ""
    //const params = JSON.parse(JSON.stringify(product));
    const responseTypes = 'text';

    {

      console.log("xx",params);
      return new Promise(resolve => {
        this.httpClient.post
          ('http://api.xiamaomi.com/product/Add', product,
            //{ headers, responseType: responseType, params }
            { responseType: responseTypes }
            
            
            
            
          )
          .subscribe(data => {
            resolve(data);
            return (data);
            console.log(data);
          }, err => {
            console.log(err);
          });
      });
    }

  }

  addSubscription(product,token) {
    const headers =
      new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "http://localhost:8100"
      });
    console.log("product", product)
    console.log("token",token)
    product.userID = ""
    const params = {
      ProductFk: product.productId,
      UserFk: token.id
    }
    //const params = JSON.parse(JSON.stringify(product));
    const responseTypes = 'text';

    {

      console.log("xx", params);
      return new Promise(resolve => {
        this.httpClient.post
          ('http://api.xiamaomi.com/productSubscription/Add', params,
            //{ headers, responseType: responseType, params }
            { responseType: responseTypes }


          )
          .subscribe(data => {
            //return data;
            resolve(data);
            //return (data);
            console.log(data);
          }, err => {
            console.log(err);
          });
      });
    }

  }

  removeSubscription(subId) {
    const headers =
      new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "http://localhost:8100"
      });
    console.log("sub ID", subId)
    //product.userID = "f687a69a-0abd-4e9f-ae51-47b8a34b910a"
    //const params = {
    //  ProductFk: product.productId,
    //  UserFk: product.userID
    //}
    //const params = JSON.parse(JSON.stringify(product));
    const responseTypes = 'text';

    {

      //console.log("xx", params);
      return new Promise(resolve => {
        this.httpClient.get
          ('http://api.xiamaomi.com/productSubscription/remove/' + subId,
            //{ headers, responseType: responseType, params }
            { responseType: responseTypes }


          )
          .subscribe(data => {
            resolve(data);
            //return (data);
            console.log(data);
          }, err => {
            console.log(err);
          });
      });
    }

  }

  addSchedule(product) {
    const headers =
      new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "http://localhost:8100"
      });
    console.log("product", product)
    const params = ""
    //const params = JSON.parse(JSON.stringify(product));
    const responseTypes = 'text';

    {

      console.log("xx", params);
      return new Promise(resolve => {
        this.httpClient.post
          ('http://api.xiamaomi.com/scheduler/add', product,
            //{ headers, responseType: responseType, params }
            { responseType: responseTypes }


          )
          .subscribe(data => {
            resolve(data);
            return (data);
            console.log(data);
          }, err => {
            console.log(err);
          });
      });
    }

  }

  addTrend(productName) {
    const headers =
      new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "http://localhost:8100"
      });
    console.log("product", productName)
    const params = ""
    //const params = JSON.parse(JSON.stringify(product));
    const responseTypes = 'text';

    {

      console.log("xx", params);
      return new Promise(resolve => {
        this.httpClient.get
          ('http://api.xiamaomi.com/product/search/' + productName,
            //{ headers, responseType: responseType, params }
            { responseType: responseTypes }


          )
          .subscribe(data => {
            resolve(data);
            return (data);
            console.log(data);
          }, err => {
            console.log(err);
          });
      });
    }

  }




  public data = [
    {
      category: 'HIIT',
      expanded: true,
      products: [
        {
          id: 0, name: 'HIIT with John', price: '8',
          photo: "data:image/jpeg;base64,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",
          description: 'We invite you to explore the variety of Yoga and Pilates classes that we offer, providing you with options of conveniently located studios and the best ways to get fit, feel energized and relax.'
        },
        { id: 1, name: 'Lets HITT together', price: '5' },
        { id: 2, name: 'HIIT with Jessie', price: '9' },
        { id: 3, name: 'HIIT is life', price: '7' }
      ]
    },
    {
      category: 'Yoga',
      products: [
        { id: 4, name: 'Beginner Yoga class by Peter', price: '8' },
        { id: 5, name: 'Learn Yoga with Amy', price: '6' }
      ]
    },
    {
      category: 'Zumba',
      products: [
        { id: 6, name: 'Learn Zumba with Tom', price: '8' },
        { id: 7, name: 'Zumba from 0', price: '5' },
        { id: 8, name: 'Lets gather for Jumba', price: '9' }
      ]
    }
  ];

  private cart = [];

  constructor(public httpClient: HttpClient) {

  }
  async getProducts() {
    await this.getRequest();
      return this.productList;

    
  }

  getCart() {
    return this.cart;
  }

  getTop5ChartTrend():Observable<any>{

    return this.httpClient.get(`http://api.xiamaomi.com/productTrend/top5chart`).pipe(
      
      map((data: any) =>{
        console.log(data);
        return data;
      })
    )

  }
  //addProduct(product) {
  //  this.cart.push(product);
  //}
}
