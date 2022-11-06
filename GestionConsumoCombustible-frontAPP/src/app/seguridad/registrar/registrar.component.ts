import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  selection : string = "";
  opciones : string[] = ['Particular', 'Empresa'];


  constructor() { }

  ngOnInit(): void {
  }

  registrarUsuario(from: NgForm) {
    
  }

}
