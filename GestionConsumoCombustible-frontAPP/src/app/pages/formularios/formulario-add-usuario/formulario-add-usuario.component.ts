import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FlexAlignStyleBuilder } from '@angular/flex-layout';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-add-usuario',
  templateUrl: './formulario-add-usuario.component.html',
})
export class FormularioAddUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  rol: string[] =['ROLE_PARTICULAR', 'ROLE_EMPRESA'];

  errores: string[] = [];

  constructor(private authService: AuthService,
      private usuarioService: UsuarioService,
      private router: Router,
      private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = + params.get('id')!;
      if (id) {
        this.usuarioService.getUsuario(id).subscribe((usuario) => this.usuario = usuario);
      }
    });
  }

  registrarConductor(): void {
    console.log(this.usuario);
    this.usuario.empresa = this.authService.getusuario().empresa;
    this.usuario.roles = [{rolId:4, rolDescripcion:'ROLE_CONDUCTOR'}];

    this.usuarioService.createUsuario(this.usuario)
      .subscribe(
        usuario => {
          this.router.navigate(['/usuario']);
          Swal.fire('Nuevo Conductor', `El conductor ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

  updateConductor(){}

  esConductor(): boolean {
    if (this.authService.token === '' || this.authService.token === undefined) {
      return false;
    }else{
      return true;
    }
  }

  getNombreEmpresa(): string {
    let razonSocial: string;

    razonSocial = this.authService.getusuario().empresa.razonSocial;

    return razonSocial
  }

  registrarUsuario(): void {
    console.log(this.usuario);


    this.usuarioService.createUsuario(this.usuario)
      .subscribe(
        usuario => {
          this.router.navigate(['/login']);
          Swal.fire('Nuevo Usuario', `Hola ${this.usuario.usuarioNombre} el registro ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

  empresa(): boolean {
    if(this.usuario.empresa !== null) {
      return true;
    }else{
      return false;
    }
  }

}
