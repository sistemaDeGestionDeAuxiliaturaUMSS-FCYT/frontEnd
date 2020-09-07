import { Component, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios

@Component({
  selector: 'app-postular-a-item',
  templateUrl: './postular-a-item.component.html',
  styleUrls: ['./postular-a-item.component.css']
})
export class PostularAItemComponent implements OnInit {
  formularioPostularItem: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.formularioPostularItem = new FormGroup({}); 
  }

}
