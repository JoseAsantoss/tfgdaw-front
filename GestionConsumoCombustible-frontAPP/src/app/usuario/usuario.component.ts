import { Component, OnInit } from '@angular/core';
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


  constructor(private usuarioService: UsuarioService, private authService: AuthService) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
    console.log('EL USUARIO QUE SER RECIBE');
    console.log(this.usuario);
    
    
  }

}
