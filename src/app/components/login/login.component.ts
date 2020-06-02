import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios 

import { validarQueSeanIguales } from './validator/app.validatorpassword';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  user: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]), //[Validators.required, Validators.minLength(2)]
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit():void{    
    alert("enviar formulario");
    this.user.reset();  
  }
} 
