import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

 //To get productList with login user subscription
 getProductList(paramsUserId) {


  const headers =
    new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    });
  {
    return new Promise(resolve => {
      this.httpClient.get
        ('http://api.xiamaomi.com/productSubscriptionId/search/' + paramsUserId,
        { headers }
        )
        .subscribe(async data => {
        console.log(" before revolve result product:",data);
        resolve(data);
        console.log("revolved result product:",data);
        //return (data);
      }, err => {
        console.log(err);
      });
    });
  }
}
//pass the prodcutList from productSubscriptionSearch
getSchedulesFromProductIdList(productList) {
  console.log("productlist.....", productList);
  let productIds = productList.productSubscriptions.map( x => x.productId);

  const params = new HttpParams().set('model', JSON.stringify(productIds))

  console.log("from params array...", params);
  const responseType = 'text';
  const headers =
    new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    });

  {
    return new Promise(resolve => {
      this.httpClient.get( 'http://api.xiamaomi.com/scheduler/get/all/byProductId',
      {
        headers, params

      })
        .subscribe( async data => {
          console.log("resolving result raw:",data);
          let scheduleList = JSON.parse(JSON.stringify(data));
          let result = new Array();
          scheduleList.forEach(element => {
                          var val = {
                            title: element.productName,
                            startTime: new Date(element.startDate),
                            endTime: new Date(element.endDate),
                            desc: element.productDescription
                          };
                          result.push(val);
                        })
                        console.log("before revolve result:",result);
          resolve(result);
          console.log("revolved result:",result);
          return (result);

      }, err => {
        console.log(err);
      });
    });
  }

}

  constructor(public httpClient: HttpClient) {

  }


}
