import { Injectable } from '@angular/core';

import { UserToken } from './../models/userToken';
import * as jwt_decode from "jwt-decode"; //decodificar jwt : npm install jwt-decode


import { SignInService } from './signin.service';


@Injectable({
  providedIn: 'root'
})

export class SesionService {
  constructor(private signInService:SignInService) { }

  createUser():void{//usuario que no accede al sistema
    this.signInService.loginUser(4,'user@gmail.com','user123').subscribe(
      datos => {     
        let token = datos['token']; 
        localStorage.setItem('token',token);        
      },
      error=>{
        //console.log(error);
        alert("Error de accesoa  la base de datos navbar ***");
    });
  }
  //-----------------------------------------------------------
  geUserToken(token:string):UserToken{
    let user = jwt_decode(token);

    let idUser = user.data['idUser'];
    let idRol = user.data['idRol'];
    let errorCode = user.data['errorCode'];
    let message = user.data['message'];

    let userToken = new UserToken(idUser,idRol,errorCode,message);
    return userToken;
  }
}