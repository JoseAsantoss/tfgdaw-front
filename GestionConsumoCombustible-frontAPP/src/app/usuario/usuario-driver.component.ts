import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Usuario } from '../model/usuario';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario-driver',
  templateUrl: './usuario-driver.component.html'
})
export class UsuarioDriverComponent implements OnInit {

  usuario: Usuario | null;
  numVehiculos!: number;
  numConductores!: number;
  nombreRazonSocial!: string;
  dia: Date = new Date();


  constructor(private usuarioService: UsuarioService, private authService: AuthService) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
    this.usuario = this.authService.getusuario()
    console.log('EL USUARIO QUE SER RECIBE');
    console.log(this.usuario);

  }

  getMes(mes: number) {
    const meses: string[] = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
      'agosto','septiembre', 'octubre', 'noviembre', 'diciembre'
    ]

    return meses[mes];

  }

}