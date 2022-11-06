import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-loginConductor',
  templateUrl: './login-conductor.component.html',
  styleUrls: ['./login-conductor.component.css']
})
export class LoginConductorComponent implements OnInit {

  //constructor(private SeguridadService: SeguridadService) { }

  constructor() { }

  ngOnInit(): void {
  }

  loginConductor(form: NgForm) {
    ////email: form.value.email,
     // password: form.value.password
    //})
  }

}
