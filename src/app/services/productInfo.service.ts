import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

   getRequest() {

     const headers = 
       new HttpHeaders({
         'Content-Type': 'application/json',
         "Access-Control-Allow-Origin": "*"
       });

     //headers.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
     //headers.append("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
     

     {
       return new Promise(resolve => {
         this.httpClient.get
           ('http://api.xiamaomi.com/product/search/Aerobic%20Class%20by%20ZY',
             { headers }
           )
           .subscribe(data => {
           resolve(data);
           console.log(data);
         }, err => {
           console.log(err);
         });
       });
     }
  }



  private data = [
    {
      category: 'Pizza',
      expanded: true,
      products: [
        { id: 0, name: 'Salami', price: '8' },
        { id: 1, name: 'Classic', price: '5' },
        { id: 2, name: 'Tuna', price: '9' },
        { id: 3, name: 'Hawai', price: '7' }
      ]
    },
    {
      category: 'Pasta',
      products: [
        { id: 4, name: 'Mac & Cheese', price: '8' },
        { id: 5, name: 'Bolognese', price: '6' }
      ]
    },
    {
      category: 'Salad',
      products: [
        { id: 6, name: 'Ham & Egg', price: '8' },
        { id: 7, name: 'Basic', price: '5' },
        { id: 8, name: 'Ceaser', price: '9' }
      ]
    }
  ];

  private cart = [];

  constructor(public httpClient: HttpClient) {

  }
  getProducts() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  addProduct(product) {
    this.cart.push(product);
  }
}
