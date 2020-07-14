import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios 
import * as jwt_decode from "jwt-decode"; //decodificar jwt : npm install jwt-decode
import { Router } from '@angular/router'; //ir de una ruta a otra

//SERVICIOS
import { SignInService } from '../../services/signin.service'; //importamos el servicio para loguearnos
import { SesionService } from './../../services/sesion.service';//importamos el servicio, para saber que usuario esta logueado


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  //providers: [SignInService]
})


export class LoginComponent implements OnInit {
  userForm: FormGroup;//es el formulario de login html
  userCheck:boolean = true;

  constructor(private signInService:SignInService,private sesionService:SesionService,private router:Router) { } //private signInService:SignInService

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]), //[Validators.required, Validators.minLength(2)]
      password: new FormControl('', [Validators.required]),
      departamento: new FormControl('',[Validators.required])
    });
  }

  onSubmit():void{
      let dep = this.userForm.get('departamento').value;
      this.signInService.loginUser(4,this.userForm.get('email').value, this.userForm.get('password').value).subscribe (
        datos => {
          let token = datos['token'];   
          let user = jwt_decode(token);

          let idUser = user.data['idUser'];

          localStorage.removeItem('tokenLogin');//porsiacaso si no se elimino la anterior sesion, lo elimino
          
          if(idUser!=-1){//el usuario existe
            localStorage.setItem('tokenLogin',token);
            this.userCheck = true;
            this.userForm.reset();
            this.router.navigate(['/']);
          }else{
            this.userCheck = false;
          }        
        },
        error=>{
          //console.log(error);
          //alert("Error de accesoa  la base de datos login");
        }
      );  
  }
} 

/**
 * [formGroup]="userForm" 
 *       formControlName="email"
 *       formControlName="password"
 *       formControlName="departamento"
 */