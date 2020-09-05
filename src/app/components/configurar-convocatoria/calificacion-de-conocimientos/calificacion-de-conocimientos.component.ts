import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SerConfConvocatoriaService } from './../servicios/ser-conf-convocatoria.service';


declare var $: any;

@Component({
  selector: 'app-calificacion-de-conocimientos',
  templateUrl: './calificacion-de-conocimientos.component.html',
  styleUrls: ['./calificacion-de-conocimientos.component.css']
})

export class CalificacionDeConocimientosComponent implements OnInit {

  formularioCalificacionDeConocimiento: FormGroup;
  porcentajeNetoConocimiento:number;
  porcentajeTotal:number;
  banderaAniadir:boolean;

  listaItemsBD:any[][] = [];  
  listaItemsDisponible:any[][] = [];
  listaItemsTabla:any[][] = [];

  listaTematicasBD:any[][] = [];
  listaTematicasDisponible:any[][] = [];
  listaTematicasTabla:any[][] = [];

  listaTiposDeEvaluacionBD:any[][] = [];
  listaTiposDeEvaluacion:any[][] = [];

  banderaTematica:boolean[] = [];
  listaItemTematica:any[][] = []; //lista de items y sus tematicas para la 
  
  opcion:string;
  idItem:HTMLFormElement;
  idItemEditar:number;
  itemValidoConocimiento:boolean;

  indexItemTabla:number;

  constructor(private serConfConvocatoria:SerConfConvocatoriaService) { }

  ngOnInit(): void {
    this.formularioCalificacionDeConocimiento = new FormGroup({});
    this.porcentajeTotal = 0;
    this.porcentajeNetoConocimiento = 0;
    this.banderaAniadir = true;

    /*
    this.listaItemsBD = [
      [1,"LCO – ADM","Administrador de Laboratorio de Cómputo"],
      [2,"LDS – ADM","Administrador de Laboratorio de Desarrollo"],
      [3,"LDS – AUX","Auxiliar de Laboratorio de Desarrollo"],
      [4,"LM – ADM –SW","Administrador de Laboratorio de Mantenimiento de Software"],
      [5,"LM – AUX –SW","Auxiliar de Laboratorio de Mantenimiento de Software"],
      [6,"LM – ADM – HW","Administrador de Laboratorio de Mantenimiento de Hardware"],
      [7,"LM – AUX – HW","Auxiliar de Laboratorio de Mantenimiento de Hardware"],
      [8,"LDS – ATL","Auxiliar de Terminal de Laboratorio de Cómputo"]
    ]; 
    */
    
    this.listaItemsBD = this.serConfConvocatoria.getItemsBD(); //servicio
    this.listaItemsDisponible = this.serConfConvocatoria.getListaItemsDisponibles();  //servicio
    this.listaItemTematica = this.serConfConvocatoria.getListaItemsTematicaTablaConocimiento(); //servicio
    
    this.listaTematicasBD = [
      [9,"ADM LINUX"],
      [10,"REDES NIVEL INTERMEDIO"],
      [11,"POSTGRES, MYSQL NIVEL INTERMEDIO"],
      [12,"PROGRAMACION PARA INTERNET, LENGUAJES DE PROGRAMACION (JSP, JAVASCRIPT, CSS, HTML, PHP, DELPHI)"],
      [13,"MODELAJE DE APLICACIONES WEB(UML),PROCESO UNIFICADO ESTRUCTURADO"],
      [14,"ENSAMBLAJE Y MANTENIMIENTO DE COMPUTADORA EN HARDWARE Y SOFTWARE"],
      [15,"ELECTRÓNICA APLICADA"],
      [16,"DIDÁCTICA"]
    ];

    this.listaTiposDeEvaluacionBD = [
      [11,"Escrito"],
      [12,"Oral"],
      [13,"Teorico"],
      [14,"Practico"]
    ];

    //this.listaItemsDisponible = this.listaItemsBD.slice();

    this.llenarTematicas();
    this.opcion = "Elige un ítem...";
    this.idItem = (<HTMLFormElement>document.getElementById('idItemConocimiento'));
    this.itemValidoConocimiento = false;
    //this.indexItemTabla = 1;
    this.indexItemTabla = this.serConfConvocatoria.getIndexItemTabla();

    
  }

  llenarTematicas(){
    let id:number = 0;
    for (let i = 0; i < this.listaTematicasBD.length; i++) {
      this.listaTematicasDisponible.push(this.listaTematicasBD[i]); // 0, 1
      this.listaTematicasDisponible[i].push(0); //2, porcentaje de una tematica, de acuerdo a la barra desplazadora, 2
      this.listaTematicasDisponible[i].push(0); //3, porcentaje para controlar los tipos de evaluacion por tematica, 3

      this.banderaTematica.push(false); // 4

      //tipos de evaluacion

      for (let j = 0; j < this.listaTiposDeEvaluacionBD.length; j++) {
        let tipoEvaluacion:any[] = [];
        tipoEvaluacion.push(id); //0 , su propio id del tipo de evaluacion de una tematica
        tipoEvaluacion.push(this.listaTematicasBD[i][0]); //1, number -> id tematica
        tipoEvaluacion.push(this.listaTiposDeEvaluacionBD[j][0]); //2, number -> id
        tipoEvaluacion.push(false); // 3,  
        tipoEvaluacion.push(this.listaTiposDeEvaluacionBD[j][1]); //4, string
        tipoEvaluacion.push(0); //5, number
        this.listaTiposDeEvaluacion.push(tipoEvaluacion);
        //------- bandera ---------------
        id = id+1;
      }
    }
  }
  
  setPorcentajeTipoEvaluacion(idTipoEvaluacion:number,idTematica:number){
    //console.log("ddd");
    let porcentaje = <HTMLFormElement>document.getElementById("porcentajeTipoEvaluacion"+idTipoEvaluacion);
    let indexTematica = this.getIndex(idTematica,this.listaTematicasDisponible);

    if(this.esNumeroEnteroPositivo(porcentaje.value)){
      
      if(Number(porcentaje.value)<=100){
        porcentaje.classList.remove('is-invalid');
        porcentaje.classList.add('is-valid');        
      }else{
        porcentaje.classList.remove('is-valid');
        porcentaje.classList.add('is-invalid');        
      }
      this.listaTiposDeEvaluacion[idTipoEvaluacion][5] = Number(porcentaje.value); 
      this.listaTematicasDisponible[indexTematica][3] = this.sumaPorcentajesTematicasTipoEvaluacion(idTematica);

      
    }else{
      porcentaje.classList.remove('is-valid');
      porcentaje.classList.add('is-invalid');
      
      this.listaTiposDeEvaluacion[idTipoEvaluacion][5] = 0;
      this.listaTematicasDisponible[indexTematica][3] = this.sumaPorcentajesTematicasTipoEvaluacion(idTematica);
    }

    if(this.listaTematicasDisponible[indexTematica][3] == 100){
      document.getElementById("porcTemEvaluaacion"+idTematica).classList.remove("text-danger");
      document.getElementById("porcTemEvaluaacion"+idTematica).classList.add("text-success");
    }else{
      document.getElementById("porcTemEvaluaacion"+idTematica).classList.remove("text-success");
      document.getElementById("porcTemEvaluaacion"+idTematica).classList.add("text-danger");
    }
  }

  sumaPorcentajesTematicasTipoEvaluacion(idTematica:number):number{
    let suma:number = 0;
    for (let i = 0; i < this.listaTiposDeEvaluacion.length ; i++) {
      if(this.listaTiposDeEvaluacion[i][1] == idTematica){
        suma += Number(this.listaTiposDeEvaluacion[i][5]);
      }       
    }
    return suma;
  }

  seleccionItemConocimiento(){
    if(this.idItem.value != "itemDefaultConocimiento"){
      this.idItem.classList.remove('is-invalid');
      this.idItem.classList.add('is-valid');
      this.itemValidoConocimiento = true;

    }else{
      this.idItem.classList.remove('is-valid');
      this.idItem.classList.add('is-invalid');
      this.itemValidoConocimiento = false;

      document.getElementById("porcentajeTematicas").classList.remove("text-danger");
      document.getElementById("porcentajeTematicas").classList.remove("text-success");
    }
    this.cambioCollapseConocimiento();    
  }

  cambioCollapseConocimiento():void{
    for (let i = 0; i < this.listaTematicasDisponible.length; i++) {
      document.getElementById("checkTematica"+this.listaTematicasDisponible[i][0]).setAttribute("data-toggle","collapse");

      if(this.itemValidoConocimiento){
        document.getElementById("checkTematica"+this.listaTematicasDisponible[i][0]).removeAttribute("disabled");
      }else{
        document.getElementById("checkTematica"+this.listaTematicasDisponible[i][0]).setAttribute("disabled","");
      }

      this.limpiarTematica(this.listaTematicasDisponible[i][0]);
      this.banderaTematica[i] = false;
      document.getElementById("rangeTematica"+this.listaTematicasDisponible[i][0]).setAttribute("disabled","");
      this.ocultarCollapse(this.listaTematicasDisponible[i][0]);

      this.reiniciarTipoEvaluacionDeTematica(this.listaTematicasDisponible[i][0]);
      this.marcarNombreTematica(this.listaTematicasDisponible[i][0]);
    }
  }

  cambioPorentajeTematica(idTematica:number){
    let element = <HTMLFormElement>document.getElementById("rangeTematica"+idTematica);
    let porcentaje:number =  element.value;
    let index:number = this.getIndex(idTematica,this.listaTematicasDisponible);
    this.listaTematicasDisponible[index][2] = porcentaje; 
    this.porcentajeTotal = this.sumaPorcentajesTematicas();
    //console.log(this.porcentajeTotal);
    //console.log("---> " + this.itemValidoConocimiento);
    this.marcarPorcentajeTotal();
    this.marcarNombreTematica(idTematica);
  }

  sumaPorcentajesTematicas():number{
    let suma:number = 0;
    for (let i = 0; i < this.listaTematicasDisponible.length; i++) {
      suma = suma + Number(this.listaTematicasDisponible[i][2]);
    }
    return suma;
  }

  marcarNombreTematica(idTematica:number){
    let index:number = this.getIndex(idTematica,this.listaTematicasDisponible);
    let nombreTematica:HTMLFormElement = <HTMLFormElement>document.getElementById("nombreTematica"+idTematica);
    
    if(this.banderaTematica[index]==true && this.listaTematicasDisponible[index][2]!=0){
      nombreTematica.classList.remove("text-danger");
      nombreTematica.classList.add("text-success");
    }else if(this.banderaTematica[index]==false){
      nombreTematica.classList.remove("text-danger");
      nombreTematica.classList.remove("text-success");
    }else{
      nombreTematica.classList.add("text-danger");
      nombreTematica.classList.remove("text-success");
    }
  }

  checkTematica(idTematica:number){
    let checkTematica:HTMLFormElement = <HTMLFormElement>document.getElementById("checkTematica"+idTematica);
    let index:number = this.getIndex(idTematica,this.listaTematicasDisponible);
    if(checkTematica.checked){
      document.getElementById("rangeTematica"+idTematica).removeAttribute("disabled");
      this.banderaTematica[index] = true;

      document.getElementById("porcTemEvaluaacion"+idTematica).classList.add("text-danger"); // *********************************************************************************************************
    }else{  
      this.reiniciarTipoEvaluacionDeTematica(idTematica);
    }
    this.marcarNombreTematica(idTematica);
  }

  checkTipoEvaluacion(indexTipoEvaluacion:number,idTematica:number):void{    
    let tipoEvaluacion:HTMLFormElement = <HTMLFormElement>document.getElementById("tipoEvaluacion"+indexTipoEvaluacion);
    if(tipoEvaluacion.checked){
      document.getElementById("porcentajeTipoEvaluacion"+indexTipoEvaluacion).removeAttribute("disabled");      
      this.listaTiposDeEvaluacion[indexTipoEvaluacion][3] = true;  
    }else{
      let porcentajeEvaluacion:HTMLFormElement = <HTMLFormElement>document.getElementById("porcentajeTipoEvaluacion"+indexTipoEvaluacion);
      this.listaTiposDeEvaluacion[indexTipoEvaluacion][3] = false;
      this.listaTiposDeEvaluacion[indexTipoEvaluacion][5] = 0; 
      
      porcentajeEvaluacion.value = "";
      porcentajeEvaluacion.setAttribute("disabled",""); 
      
      porcentajeEvaluacion.classList.remove('is-valid');
      porcentajeEvaluacion.classList.remove('is-invalid');


      let sumaTematica:number = this.sumaPorcentajesTematicasTipoEvaluacion(idTematica);
      let indexTematica = this.getIndex(idTematica,this.listaTematicasDisponible);
      this.listaTematicasDisponible[indexTematica][3] = sumaTematica;

      if(sumaTematica!=100){
        document.getElementById("porcTemEvaluaacion"+idTematica).classList.add("text-danger");
      }
    }
  }

  clearTipoEvaluacion(idTematica:number){
    for (let i = 0; i < this.listaTiposDeEvaluacion.length; i++) {
      if(this.listaTiposDeEvaluacion[i][1] == idTematica){
        this.listaTiposDeEvaluacion[i][3] = false;
        this.listaTiposDeEvaluacion[i][5] = 0; 
        let porcentajeEvaluacion:HTMLFormElement = <HTMLFormElement>document.getElementById("porcentajeTipoEvaluacion"+this.listaTiposDeEvaluacion[i][0]);
        porcentajeEvaluacion.value = "";
        porcentajeEvaluacion.classList.remove('is-valid');
        porcentajeEvaluacion.classList.remove('is-invalid');
        porcentajeEvaluacion.setAttribute("disabled","");
      }        
    }
  }

  ocultarCollapse(idTematica:number):void{
    document.getElementById("collapseOne"+idTematica).classList.remove("show");
    document.getElementById("collapseOne"+idTematica).classList.add("hide"); 
    
    this.reiniciarTipoEvaluacionDeTematica(idTematica);
  }

  reiniciarTipoEvaluacionDeTematica(idTematica:number){
    let index:number = this.getIndex(idTematica,this.listaTematicasDisponible);
    
    this.limpiarTematica(idTematica);
    document.getElementById("rangeTematica"+idTematica).setAttribute("disabled","");
    this.banderaTematica[index] = false;
    this.clearTipoEvaluacion(idTematica);

    document.getElementById("porcTemEvaluaacion"+idTematica).classList.remove("text-success");
    document.getElementById("porcTemEvaluaacion"+idTematica).classList.remove("text-danger");
    
    this.listaTematicasDisponible[index][3] = 0;
    this.marcarPorcentajeTotal();
  }

  marcarPorcentajeTotal(){
    if(this.itemValidoConocimiento==true){
      //console.log("*si");
      if(this.porcentajeTotal==100){
        //console.log("**si");
        document.getElementById("porcentajeTematicas").classList.remove("text-danger");
        document.getElementById("porcentajeTematicas").classList.add("text-success");
      }else{
        //console.log("**no");
        document.getElementById("porcentajeTematicas").classList.remove("text-success");
        document.getElementById("porcentajeTematicas").classList.add("text-danger");
      }
    }else{
      //console.log("*no");
    }
  }

  limpiarTematica(idTematica:number):void{
    (<HTMLFormElement>document.getElementById("rangeTematica"+idTematica)).value = 0;
    let index:number = this.getIndex(idTematica,this.listaTematicasDisponible);
    this.porcentajeTotal -= Number(this.listaTematicasDisponible[index][2]);
    this.listaTematicasDisponible[index][2] = 0;
  }

  getIndex(id:number,lista:any[]):number{
    let index:number = -1;
    for (let i = 0; i < lista.length; i++) {
      if(lista[i][0] == id){
        index = i;
        break;
      }      
    }
    return index;
  }

  getIndexEditar():number{
    let indexItem:number = -1;
    for (let i = 0; i < this.listaItemTematica.length; i++) {
      if(this.listaItemTematica[i][0]==true){// es item
        if(this.listaItemTematica[i][2] == this.idItemEditar){ // es la tematica a editar
          indexItem = i;
          break;
        }
      }          
    }
    return indexItem;
  }

  esNumeroEnteroPositivo(num:any):boolean {
    var esNumero = false;
    if(!this.textoVacio(num)){
      var n = Number(num);    
      if(!isNaN(n)){ // es numero
        if((n%1===0) && (n>0)){ //valido que se entero
          esNumero = true;
        }
      }
    }
    return esNumero;
  }

  textoVacio(valor:any):boolean{
    return valor == null || valor.length == 0 || /^\s+$/.test(valor); 
  } 

  //_----------------------------
  aniadirConocimiento(){ // boton add de la barra negra
    this.banderaAniadir = true;
    this.limpiarCamposModalConocimiento();
  }

  limpiarCamposModalConocimiento(){
    this.idItem.classList.remove('is-valid');
    this.idItem.classList.remove('is-invalid');
    this.itemValidoConocimiento = false;

    document.getElementById("porcentajeTematicas").classList.remove("text-danger");
    document.getElementById("porcentajeTematicas").classList.remove("text-success");
    this.cambioCollapseConocimiento();
    
    this.idItem.removeAttribute("disabled");
    this.opcion = "Elige un ítem...";
    this.idItem.options.selectedIndex = 0;

  }

  aniadirItemATabla():void{
    //console.log("guardar");
    let botonGuardar:HTMLFormElement;
    if(this.banderaAniadir){
      botonGuardar = <HTMLFormElement>document.getElementById("botonAddConocimiento");
    }else{
      this.itemValidoConocimiento = true;
      botonGuardar = <HTMLFormElement>document.getElementById("botonUpdateConocimiento");
    }
    botonGuardar.removeAttribute("data-dismiss");

    if(this.modalConocimientoValido()){
      //console.log("modal valido");
      if(this.banderaAniadir){//aniadir
        let indexItem:number = this.getIndex(Number(this.idItem.value),this.listaItemsDisponible);
        
        let item:any[] = [
          true, // 0, para saber si es un item o una tematica (item)
          //this.indexItemTabla, //1, indice del item para la tabla en la interfaz
          this.serConfConvocatoria.getIndexItemTabla(),
          this.listaItemsDisponible[indexItem][0], // 2, iditem bd
          this.listaItemsDisponible[indexItem][1], // 3, codigo propio del item
          this.listaItemsDisponible[indexItem][2], // 4, nombre del item
          this.porcentajeTotal //5, porcentaje por item --> 100
        ];
        
        this.listaItemTematica.push(item);
        //this.indexItemTabla = this.indexItemTabla +  1;

        this.serConfConvocatoria.setIndexItemTabla(this.serConfConvocatoria.getIndexItemTabla()+1);
        this.indexItemTabla = this.serConfConvocatoria.getIndexItemTabla();
        

        for (let i = 0; i < this.listaTematicasDisponible.length; i++) { //recorrer las tematicas
          let checkTematica:HTMLFormElement = <HTMLFormElement>document.getElementById("checkTematica"+this.listaTematicasDisponible[i][0]);
          if(checkTematica.checked){  
            let tematica:any[] = [
              false, // 0, para saber si es un item o una tematica (tematica)
              Number(this.idItem.value), //1, id del item al que pertenece
              this.listaTematicasDisponible[i][0], //2, id tematica
              this.listaTematicasDisponible[i][1], //3, nombre tematica 
              this.listaTematicasDisponible[i][2], //4, porcentaje asignado a la tematica barra dezplazadora
              this.listaTematicasDisponible[i][3]  //5, porcentaje de los tipos de evaluacion
            ];    
            this.listaItemTematica.push(tematica);       
            
            let evaluacion:any[][] = []; 
            for (let j = 0; j < this.listaTiposDeEvaluacion.length; j++) {
              if(this.listaTematicasDisponible[i][0] == this.listaTiposDeEvaluacion[j][1]){
                if(this.listaTiposDeEvaluacion[j][3] == true){
                  evaluacion.push(this.listaTiposDeEvaluacion[j].slice());
                }
              }
            }
            tematica.push(evaluacion);//6             
          }
        }
        this.listaItemsDisponible.splice(indexItem,1);

      }else{ // update
        //console.log("-------------- actualizar ------------------");
        let indexItem:number = this.getIndexEditar();
        indexItem = indexItem + 1;
        //console.log("index: " + indexItem);
        //console.log(this.listaItemTematica.slice());

        let i:number = indexItem;
        while (i<this.listaItemTematica.length && this.listaItemTematica[i][0] == false) {
          if(this.listaItemTematica[i][0] == false){
            this.listaItemTematica.splice(i,1);            
          }else{
            i = i+1;
          }
          /*console.log("si 1");
          this.listaItemTematica.splice(indexItem,1);
          console.log("si 1");*/
        }

        

        //console.log(this.listaItemTematica.slice());
        //console.log("---------------------------------");
        //console.log(this.listaTematicasDisponible.slice());

        for (let i = 0; i < this.listaTematicasDisponible.length; i++) { //recorrer las tematicas
          let checkTematica:HTMLFormElement = <HTMLFormElement>document.getElementById("checkTematica"+this.listaTematicasDisponible[i][0]);
          if(checkTematica.checked){  
            let tematica:any[] = [
              false, // 0, para saber si es un item o una tematica (tematica)
              Number(this.idItemEditar), //1, id del item al que pertenece
              this.listaTematicasDisponible[i][0], //2, id tematica
              this.listaTematicasDisponible[i][1], //3, nombre tematica 
              this.listaTematicasDisponible[i][2], //4, porcentaje asignado a la tematica barra dezplazadora
              this.listaTematicasDisponible[i][3]  //5, porcentaje de los tipos de evaluacion
            ];
            //console.log(tematica.slice());
            //this.listaItemTematica.push(tematica);      
            this.listaItemTematica.splice(indexItem,0,tematica);
            indexItem = indexItem+1;
            //console.log(this.listaItemTematica.slice());

            let evaluacion:any[][] = []; 
            for (let j = 0; j < this.listaTiposDeEvaluacion.length; j++) {
              if(this.listaTematicasDisponible[i][0] == this.listaTiposDeEvaluacion[j][1]){
                if(this.listaTiposDeEvaluacion[j][3] == true){
                  evaluacion.push(this.listaTiposDeEvaluacion[j].slice());
                }
              }
            }
            tematica.push(evaluacion);//6             
          }
        }
      }
      botonGuardar.setAttribute("data-dismiss","modal");
    }else{
      //console.log("modal no valido");
    }
  } 
  
  editarItemDeTabla(idItem:number):void{
    this.idItemEditar = idItem;
    this.limpiarCamposModalConocimiento();
    this.banderaAniadir = false;
    this.porcentajeTotal = 100;
    document.getElementById("porcentajeTematicas").classList.add("text-success");

    for(let i = 0; i<this.listaItemTematica.length; i++){
      if(this.listaItemTematica[i][0] == true){ // item
        if(this.listaItemTematica[i][2] == idItem){
          this.opcion = this.listaItemTematica[i][3] + " : " + this.listaItemTematica[i][4];
          this.idItem.setAttribute("disabled","");
          this.idItem.classList.add("is-valid");
        }
      }else{ // tematica
        if(this.listaItemTematica[i][1] == idItem){
          let tematica:any[] = this.listaItemTematica[i];
          for (let j = 0; j < this.listaTematicasDisponible.length; j++) { 
            if(this.listaTematicasDisponible[j][0] == tematica[2]){ // id tematica
              this.banderaTematica[j] = true;
              this.listaTematicasDisponible[j][2] = tematica[4];  //porcentaje de una tematica, de acuerdo a la barra desplazadora, 2
              this.listaTematicasDisponible[j][3] = tematica[5];  //porcentaje para controlar los tipos de evaluacion por tematica, 3

              (<HTMLFormElement>document.getElementById("nombreTematica"+tematica[2])).classList.add("text-success");
              (<HTMLFormElement>document.getElementById("porcTemEvaluaacion"+tematica[2])).classList.add("text-success");
              
              let m:number = 0;
              for (let k = 0; k < this.listaTiposDeEvaluacion.length; k++) { // busco los tipos de evaluacion de una tematica
                if(this.listaTiposDeEvaluacion[k][1] == tematica[2]){ //id tematica
                  //this.listaTiposDeEvaluacion[k] = tematica[6][k];
                  /*
                  console.log(tematica[6])  
                  console.log(tematica[6][0]);  
                  console.log(tematica[6][0][3]);
                  console.log(tematica[6].length);
                  console.log("----------");
                  */
                  if(m<tematica[6].length){ 
                    if(tematica[6][m][3] == true && tematica[6][m][0] == this.listaTiposDeEvaluacion[k][0]){
                      //console.log("si");
                      this.listaTiposDeEvaluacion[k][3] = true;
                      this.listaTiposDeEvaluacion[k][5] = tematica[6][m][5];
                      
                      let evaluacionTematica:HTMLFormElement = <HTMLFormElement>document.getElementById("porcentajeTipoEvaluacion"+this.listaTiposDeEvaluacion[k][0]);
                      evaluacionTematica.removeAttribute("disabled");
                      evaluacionTematica.classList.add("is-valid");
                      evaluacionTematica.value = tematica[6][m][5];
                      m = m+1;
                    }
                  }
                  //console.log(this.listaTiposDeEvaluacion[k]);
                } 
              }
              break;
            }
          }
        }
      }
    }
    this.habilitarTodasLasTematicas();
    this.itemValidoConocimiento = true;
  }

  eliminarItemDeTabla(idItem:number):void{
    let index:number = this.getIndex(idItem,this.listaItemsBD);
    
    this.listaItemsDisponible.push(this.listaItemsBD[index]);
    
    let indexAux:number = 1;
    let listaItemTematicaAux:any[][] = [];
    
    for (let i = 0; i < this.listaItemTematica.length; i++) {
      if(this.listaItemTematica[i][0] == true){ // es un nombre de item
        if(this.listaItemTematica[i][2] != idItem ){
          this.listaItemTematica[i][1] = indexAux;
          listaItemTematicaAux.push(this.listaItemTematica[i]);
          indexAux = indexAux +1;
        }
      }else{ // es un nombre de tematica
        if(this.listaItemTematica[i][1] != idItem){
          listaItemTematicaAux.push(this.listaItemTematica[i]);
        }
      }
    }

    //this.indexItemTabla = indexAux;
    this.serConfConvocatoria.setIndexItemTabla(indexAux); //actualizamos el index del servicio
    this.indexItemTabla = this.serConfConvocatoria.getIndexItemTabla();

    this.listaItemTematica.splice(0);
    this.listaItemTematica = listaItemTematicaAux.slice();
  }

  habilitarTodasLasTematicas(){
    for (let i = 0; i < this.listaTematicasDisponible.length; i++) {
      let rangoTematica:HTMLFormElement = <HTMLFormElement>document.getElementById("rangeTematica"+this.listaTematicasDisponible[i][0]);
      rangoTematica.removeAttribute("disabled");
      rangoTematica.value = this.listaTematicasDisponible[i][2];
      
      document.getElementById("checkTematica"+this.listaTematicasDisponible[i][0]).removeAttribute("disabled");
      
      if(this.listaTematicasDisponible[i][2] != 0){
        let idTematica:number = this.listaTematicasDisponible[i][0];
        document.getElementById("collapseOne"+idTematica).classList.remove("hide");
        document.getElementById("collapseOne"+idTematica).classList.add("show");   
      }
    }
  }
 
  modalConocimientoValido():boolean{
    let valido:boolean = true;  
    if(this.itemValidoConocimiento){
      if(this.porcentajeTotal == 100){  // porcentaje de el totakl de las tematicas      
        for (let i = 0; i < this.listaTematicasDisponible.length; i++) {
          let checkTematica:HTMLFormElement = <HTMLFormElement>document.getElementById("checkTematica"+this.listaTematicasDisponible[i][0]);
          if(checkTematica.checked){
            //console.log("checkTematica ok : " + this.listaTematicasDisponible[i][0] );
            //console.log(this.listaTematicasDisponible[i]);
            if(Number(this.listaTematicasDisponible[i][2]) > 0 && this.listaTematicasDisponible[i][3] == 100){ //porcentaje de la barra desplazadora de una tematica && porcentaje de la suma de los tiposd e evaluacion para una temativa
              //console.log("porcentaje tematica :" + this.listaTematicasDisponible[i][3] );
              
              for (let j = 0; j < this.listaTiposDeEvaluacion.length; j++) {
                if(this.listaTematicasDisponible[i][0] == this.listaTiposDeEvaluacion[j][1]){
                  if(this.listaTiposDeEvaluacion[j][3] == true){
                    if(this.listaTiposDeEvaluacion[j][5] > 0){
                        
                    }else{
                      valido = false;
                      //console.log("failll");
                      document.getElementById("porcentajeTipoEvaluacion"+this.listaTiposDeEvaluacion[j][0]).classList.add("is-invalid");
                    }
                  }
                }
              }
            }else{
              valido = false;
              console.log("porcentaje de la tematica fail: " + this.listaTematicasDisponible[i][1]);
            }            
          }
        }
      }else{
        valido = false;
        //console.log("fail porcentaje : " + this.porcentajeTotal)
      }
    }else{
      valido = false;
      //console.log("fail item");
    }
    return valido
  }

  setPorcentajeNetoConocimiento(){
    let porcentajeElement:HTMLFormElement = <HTMLFormElement>document.getElementById("porcentajeNetoconocimientos");
    let porcentajeValue = porcentajeElement.value;

    if(this.esNumeroEnteroPositivo(porcentajeValue)){
      let sumaPorcentajes:number =  Number(this.serConfConvocatoria.getPorcentajeNetoMerito()) + Number(porcentajeValue);
      //console.log("-> merito: " + this.serConfConvocatoria.getPorcentajeNetoMerito());
      //console.log("-> suma: " + sumaPorcentajes);
      if(sumaPorcentajes <= 100){
        this.porcentajeNetoConocimiento = porcentajeValue;
        porcentajeElement.value = "";
        porcentajeElement.classList.remove("is-valid");
        porcentajeElement.classList.remove("is-invalid");
        this.serConfConvocatoria.setPorcentajeNetoConocimiento(this.porcentajeNetoConocimiento);
      }else{
        porcentajeElement.classList.remove("is-valid");
        porcentajeElement.classList.add("is-invalid");
      }
    }    
  }

  validarPorcentajeNetoConocimiento(){
    let porcentajeElement:HTMLFormElement = <HTMLFormElement>document.getElementById("porcentajeNetoconocimientos");
    let porcentajeValue = porcentajeElement.value;

    if(this.esNumeroEnteroPositivo(porcentajeValue)){
      porcentajeElement.classList.remove("is-invalid");
      porcentajeElement.classList.add("is-valid");
    }else{
      porcentajeElement.classList.remove("is-valid");
      porcentajeElement.classList.add("is-invalid");
    }  
  }
}
