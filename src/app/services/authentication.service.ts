import { Injectable} from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap,catchError } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject  } from 'rxjs';

import { Plugins } from '@capacitor/core';
import { isNull } from '@angular/compiler/src/output/output_ast';
const { Storage } = Plugins;

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  error = '';

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    
    const headers = 
    new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    });

    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
  
  login(credentials: { username, password }):Observable<any>{

  
    const params = JSON.parse(JSON.stringify(credentials));
    console.log(params);
    return this.http.post(`http://api.xiamaomi.com/user/login`,params).pipe(
      
      map((data: any) =>{
        console.log(data);
        this.error = data.errorMessage;
        this.token = data.users[0];
      }),
      tap(result => {
        if(this.token != undefined)
        {
          this.isAuthenticated.next(true);
        }else
        {
          //return {error:"invalid username/password"};
          this.isAuthenticated.next(false);
        }
        //console.log(result);
      })
    )
    
  }

  register(personalInformation: { username, password,name, age, email,roleid }):Observable<any>{

  
    const params = JSON.parse(JSON.stringify(personalInformation));
    console.log(params);
    return this.http.post('http://api.xiamaomi.com/user/register',params).pipe(
      
      map((data: any) =>{
        console.log(data);
        this.error = data.errorMessage;
        this.token = params;
      }),
      tap(result => {
        if(this.token != undefined)
        {
          this.isAuthenticated.next(true);
        }else
        {
          //return {error:"invalid username/password"};
          this.isAuthenticated.next(false);
        }
        //console.log(result);
        
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: TOKEN_KEY });
  }

  getUserToken(){
    return this.token;

  }
  checkIfUserTokenExist(){
    console.log("this token");
    console.log(this.token["id"]);
    if(!this.token["id"])
    {
      console.log("checkIfUserTokenExist return false");
      return false;

    }
    else
    {
      console.log("checkIfUserTokenExist return true");
      
      return true;
    }

  }
}
