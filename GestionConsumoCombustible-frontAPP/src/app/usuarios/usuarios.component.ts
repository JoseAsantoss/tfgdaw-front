import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Usuario } from '../model/usuario';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[];
  paginador!: AnalyserNode;
  usuarioSeleccionado!: Usuario;

  constructor(private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page')!;

      if (!page) {
        page = 0;
      }

      this.usuarioService.getUsuarios(page)
        .pipe(
          tap(response => {
            console.log('UsuarioComponent: tap 3');
            (response.content as Usuario[]).forEach(usr => console.log(usr.nombre));
          })
        ).subscribe(response => {
          this.usuarios = response.content as Usuario[];
          this.paginador = response;
        });
    });
  }

}
