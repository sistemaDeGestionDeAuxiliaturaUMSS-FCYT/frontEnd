import { Component, OnInit } from '@angular/core';

import { NgModule } from '@angular/core';
import { FormsModule,FormGroup,FormControl } from '@angular/forms'; //****

//servicios
import { SesionService } from './../../services/sesion.service'; //importamos el servicio, para saber que usuario esta logueado
import { SignInService } from './../../services/signin.service'; //importamos el servicio, para loguear a un usuario, generar una coneccion en la base de datos
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logout:boolean = false;
  departamento:string;
  departamentos:string[];

 

  constructor(private sesionService:SesionService,private signInService:SignInService) { }

  ngOnInit(): void {    
    if(localStorage.getItem('token')==null){
      this.sesionService.createUser();
    }    
    
    
    this.departamentos = ['Inf','Mat','Sis'];//get departamentos de la base de datos
    //this.departamento = this.departamento[0];
    this.departamento = this.departamentos[0];
  }

  userIsLogin():boolean{
    return (localStorage.getItem('tokenLogin')==null)?false:true;
  }

  salir(){
    localStorage.removeItem('tokenLogin');
    this.logout = false;
  }

  getDepartamento():any[]{
    return this.departamentos;
  }

  setDepartamento(departamento:string){
    this.departamento = departamento;
  }  
}

/**
 * form control
 * 
 */