import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios


@Component({
  selector: 'app-datos-rotulo',
  templateUrl: './datos-rotulo.component.html',
  styleUrls: ['./datos-rotulo.component.css']
})
export class DatosRotuloComponent implements OnInit {
  formularioDatoRotulo: FormGroup;
  
  listaDatosBaseDeDatos:string[][] = [];
  listaDatosSeleccionados:string[][] = [];
  listaDatosSeleccionadosTabla:string[][] = [];
  listaBandera:boolean[] = [];
  banderaTodosSeleccionados:boolean;
  datosRotuloCheck:HTMLElement;
  inputSeleccionarTodos:HTMLInputElement;

  constructor() {
    this.formularioDatoRotulo = new FormGroup({});
  }

  ngOnInit(): void {
    //id, nombre, tam minimimo, tam maximo, tipo de dato
    

    this.listaDatosBaseDeDatos = [
      ["12","Nombres","2","50","string"],
      ["13","Apellido paterno","2","50","string"],
      ["14","Apellido materno","2","50","string"],
      ["15","Genero","1","1","string"],
      ["16","Dirección","5","50","string"],
      ["17","Telefono","3","10","integer"],
      ["18","Email","3","50","email"]
    ];
    this.crearListaBandera();
    this.banderaTodosSeleccionados = false;
    this.datosRotuloCheck = document.getElementById('datosRotuloCheck');
    this.inputSeleccionarTodos = <HTMLInputElement>document.getElementById('todosLosDatos');
  }

  crearListaBandera(){
    for (let i = 0; i < this.listaDatosBaseDeDatos.length; i++) {
      this.listaBandera.push(false);
    }
  }

  setListaBandera(bandera:boolean){
    for (let i = 0; i < this.listaDatosBaseDeDatos.length; i++) {
      this.listaBandera[i] = bandera;     
    }
  }

  cambioSeleccionarTodosLosDatos(){  
    if(this.inputSeleccionarTodos.checked){
      this.seleccionarTodosLosDatosDeLista();          
    }else{
      this.limpíarTodosLosDatosSeleccionados();
    }
    //console.log(this.listaDatosSeleccionados);
    //console.log(this.listaBandera);
  }

  seleccionarTodosLosDatosDeLista(){
    this.limpíarTodosLosDatosSeleccionados();

    for (let i = 0; i < this.listaDatosBaseDeDatos.length; i++) {       
      this.listaDatosSeleccionados.push(this.listaDatosBaseDeDatos[i]);
    }
    this.setListaBandera(true); 
    this.verificarBanderaTodosMarcados();
  }

  limpíarTodosLosDatosSeleccionados(){
    this.listaDatosSeleccionados.splice(0);
    this.setListaBandera(false);
    this.verificarBanderaTodosMarcados();
    this.datosRotuloCheck.classList.add('is-invalid');
  }

  setDatoLista(idDato:string){
    let dato:HTMLInputElement = <HTMLInputElement>document.getElementById(idDato);    
    if(dato.checked){
      let index:number = this.getIndex(idDato,this.listaDatosBaseDeDatos);
      let lista:string[]=[];
      lista.push(this.listaDatosBaseDeDatos[index][0]);
      lista.push(this.listaDatosBaseDeDatos[index][1]);
      lista.push(this.listaDatosBaseDeDatos[index][2]);
      lista.push(this.listaDatosBaseDeDatos[index][3]);
      lista.push(this.listaDatosBaseDeDatos[index][4]);

      this.listaDatosSeleccionados.push(lista);

      
      this.listaBandera[index] = true;

      this.datosRotuloCheck.classList.remove('is-invalid');      
      
      if(this.listaDatosSeleccionados.length == this.listaDatosBaseDeDatos.length){
        this.banderaTodosSeleccionados = true;
      }else{
        this.banderaTodosSeleccionados = false;
      }
    }else{
      let index:number = this.getIndex(idDato,this.listaDatosSeleccionados);
      this.listaDatosSeleccionados.splice(index,1);

      index = this.getIndex(idDato,this.listaDatosBaseDeDatos);
      this.listaBandera[index] = false;

      if(this.listaDatosSeleccionados.length==0){
        this.datosRotuloCheck.classList.add('is-invalid');
      }
      this.banderaTodosSeleccionados = false;      
    }
    console.log(this.listaDatosSeleccionados);
    console.log(this.listaBandera);
  }

  getIndex(idDato:string,lista:string[][]):number{
    let index:number = -1;
    for (let i = 0; i < lista.length; i++) {
      if(lista[i][0] == idDato ){
        index = i;
        break;
      }      
    }
    return index;
  }

  eliminarDatoDeLista(idDato:string){
    let index = this.getIndex(idDato,this.listaDatosSeleccionadosTabla);
    this.listaDatosSeleccionadosTabla.splice(index,1);
    
    index = this.getIndex(idDato,this.listaDatosSeleccionados);
    this.listaDatosSeleccionados.splice(index,1);

    index = this.getIndex(idDato,this.listaDatosBaseDeDatos);
    this.listaBandera[index] = false;

    this.verificarBanderaTodosMarcados();
  }
  
  clickAniadir(){
    this.datosRotuloCheck.classList.remove('is-invalid');
  }

  guardarDatos(){        
    let guardarModalDatos:HTMLElement = document.getElementById('guardarModalDatos');
    
    if(this.listaDatosSeleccionados.length>0){
      this.listaDatosSeleccionadosTabla.splice(0);
      for (let i = 0; i < this.listaDatosSeleccionados.length; i++) {
        this.listaDatosSeleccionadosTabla.push(this.listaDatosSeleccionados[i]);      
      }      
      guardarModalDatos.setAttribute("data-dismiss","modal");
    }else{
      guardarModalDatos.removeAttribute("data-dismiss");
      this.datosRotuloCheck.classList.add('is-invalid');
    }
  }

  cancelarGuardarDatos(){
    this.listaDatosSeleccionados.splice(0);
    this.setListaBandera(false);

    for (let i = 0; i < this.listaDatosSeleccionadosTabla.length; i++) {
      this.listaDatosSeleccionados.push(this.listaDatosSeleccionadosTabla[i]);
      let index = this.getIndex(this.listaDatosSeleccionadosTabla[i][0],this.listaDatosBaseDeDatos);
      this.listaBandera[index] = true;         
    }

    this.verificarBanderaTodosMarcados();
  }

  verificarBanderaTodosMarcados(){
    if(this.listaDatosSeleccionados.length == this.listaDatosBaseDeDatos.length){
      this.banderaTodosSeleccionados = true;
      
    }else{
      this.banderaTodosSeleccionados = false;
    }
    
    this.datosRotuloCheck.classList.remove('is-invalid');
    if(this.listaDatosSeleccionados.length==0){
      this.datosRotuloCheck.classList.add('is-invalid');
    }
  }
}
