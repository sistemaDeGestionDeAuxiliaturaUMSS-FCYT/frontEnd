import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { AnyARecord } from 'dns';

@Component({
  selector: 'app-requisitos',
  templateUrl: './requisitos.component.html',
  styleUrls: ['./requisitos.component.css']
})
export class RequisitosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  add(event:any){
    //alert("carajo" + event.target.textContent);

    console.log(event);
    
    
    const el: HTMLElement = document.getElementById('moco');
    el.setAttribute("class","bg-primary");
    
    var ss = el.getAttribute("id");
    alert(ss);
    console.log(el);
  }
}
