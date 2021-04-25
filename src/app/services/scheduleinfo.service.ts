import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {



  getSchedulesFromScheduleTable(){
    //const userId = localStorage.getItem('loginId');
    //const userId = 'a32abe9e-c231-4c80-819d-aef95ed5e3bb';
    const headers =
      new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      });
    {
      return new Promise(resolve => {
        this.httpClient.get
          ('http://api.xiamaomi.com/scheduler/get/all',
          { headers }
          )
          .subscribe(data => {
            console.log("resolve after API call subscribe...", data);
            let scheduleList = JSON.parse(JSON.stringify(data));
            console.log("scheduleList after Json Parse...", scheduleList);
            let result = new Array();
            scheduleList.forEach(element => {
                            var val = {
                              title: element.schedulerName,
                              startTime: new Date(element.startDate),
                              endTime: new Date(element.endDate),
                              desc: element.schedulerDescription,
                             productName : element.productName
                            };
                            result.push(val);
                          })
                          console.log("Before resolve scheduleList as Result Array...", result);
          resolve(result);
          console.log("After resolve scheduleList as Result Array...", result);
            return (result);
          console.log("resolving result:",data);
        }, err => {
          console.log(err);
        });
      });
    }
 }

//Using Dummy Data (Product in single Object)
//Testing with Dummy (Product) Pass in here
getSchedulesFromProductIdObject (productDummyObj) {
  //Dummy Data is passed as object
  let productParse = JSON.parse(JSON.stringify(productDummyObj));
  console.log("productPaser....", productParse);
  //Dummy Data parsed object to String Type to pass to param
  let productObj = productParse.map( x => x.productId);
  console.log("productObj after map to productId....", productObj);

  //Pass as string to pass to Schedule API as FromQuery
   const params = new HttpParams().set('model', JSON.stringify(productObj))
   console.log("from array...", params);

   const responseType = 'text';
   const headers =
     new HttpHeaders({
       'Content-Type': 'application/json',
       "Access-Control-Allow-Origin": "*"
     });

   {
     return new Promise(resolve => {
       this.httpClient.get( 'https://localhost:5001/scheduler/get/all/byProductId',
       {
         headers, params

       })
         .subscribe( async data => {
           console.log("subscribe resolve API result raw:",data);
           let scheduleList = JSON.parse(JSON.stringify(data));
           let result = new Array();
           scheduleList.forEach(element => {
                           var val = {
                             title: element.schedulerName,
                             startTime: new Date(element.startDate),
                             endTime: new Date(element.endDate),
                             desc: element.schedulerDescription,
                            productName : element.productName
                           };
                           result.push(val);
                         })
                         console.log("resolving result:",result);
         resolve(result);

           return (result);

       }, err => {
         console.log(err);
       });
     });
   }

  }


 //Example Format to get form ZY (Product List)
 getProductList() {
  const headers =
    new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    });
  {
    return new Promise(resolve => {
      this.httpClient.get
        ('https://localhost:5001/scheduler/get/all',
        { headers }
        )
        .subscribe(async data => {
        console.log(" before revolve result product:",data);
        resolve(data);
        console.log("revolve result product:",data);
        //return (data);
      }, err => {
        console.log(err);
      });
    });
  }
}
//Example Format to get form ZY (ProductId List) Pass in here
getSchedulesFromProductIdList(productList) {
  let productIds = productList.map( x => x.productId);

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
      this.httpClient.get( 'https://localhost:5001/scheduler/get/all/byProductId',
      {
        headers, params

      })
        .subscribe( async data => {
          console.log("resolving result raw:",data);
          let scheduleList = JSON.parse(JSON.stringify(data));
          let result = new Array();
          scheduleList.forEach(element => {
                          var val = {
                            title: element.schedulerName,
                            startTime: new Date(element.startDate),
                            endTime: new Date(element.endDate),
                            desc: element.schedulerDescription,
                           productName : element.productName
                          };
                          result.push(val);
                        })
                        console.log("resolving result:",result);
        resolve(result);

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
