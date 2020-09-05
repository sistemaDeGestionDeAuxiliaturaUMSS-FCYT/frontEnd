import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http'; //para llamar al backend mediante http : signin servicev


@Injectable({
  providedIn: 'root'
})
export class SignInService {
  url = 'http://localhost/tis/backendGerson/angular/';
  
  user = {
    userType:null,
    email: null,
    password: null
  }

  constructor(private http:HttpClient) { }

  headers:HttpHeaders = new HttpHeaders({
    "Content-type":"application/json"
  });

  loginUser(userType:number, email:string, password:string) {
    //console.log(JSON.stringify(login));
    this.user.userType = userType;
    this.user.email = email;
    this.user.password = password;
    return this.http.post(`${this.url}signin.php`, JSON.stringify(this.user));
  }  
}
