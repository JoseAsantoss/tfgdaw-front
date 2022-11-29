import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Usuario } from '../model/usuario';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario | null;
  numVehiculos!: number;
  numConductores!: number;
  nombreRazonSocial!: string;


  constructor(private usuarioService: UsuarioService, private authService: AuthService) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
    this.usuario = this.authService.getusuario()
    console.log('EL USUARIO QUE SER RECIBE');
    console.log(this.usuario);
    
    
  }

  isEmpresa(): boolean { 
    if (this.usuario!.roles === 'ROLE_EMPRESA') {
      return true
    }else {
      
      return false
    }
  }

  getNumVehiculos(): number {
    
    return 3;
  }

  getNumConductores(): number {

    return 5;
  }

}