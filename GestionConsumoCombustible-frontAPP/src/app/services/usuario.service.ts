import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../Constantes/app-routes.constants';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  
  private httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e: any): boolean {
    if (e.status == 401) {

      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status == 403) {
      swal.fire('Acceso denegado', `Hola ${this.authService.getusuario().usuarioNombre} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/usuario']);
      return true;
    }
    return false;
  }

  getUsuarios(page: number): Observable<any> {
    return this.http
      .get(environment.rooturl + AppConstants.OBTENER_USUARIOS+'/page'+page, {headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e=> {
          this.isNoAutorizado(e);
          return throwError(() => e);
        })
      );   
  }

  getUsuario(idUsuario: number): Observable<Usuario> {
    return this.http
      .get<Usuario>(AppConstants.GESTION_USUARIO + '/' + idUsuario, {headers: this.agregarAuthorizationHeader()})
      .pipe(map((response) => response as Usuario));
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    console.log('EL CONDUCTOR QUE SE DA DE ALTA')
    console.log(usuario)
    return this.http.post(environment.rooturl + AppConstants.ALTA_USUARIOS, usuario, {headers: this.agregarAuthorizationHeader() })
      .pipe(
        map((response:any) => response.usuario as Usuario),
        catchError (e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }

          if (e.status == 400) {
            return throwError(e);
          }

          console.log(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      )
  }

  getConductores(empresa: String): Observable<Usuario[]> {
    return this.http.get(environment.rooturl + AppConstants.OBTENER_USUARIOS + '/' + empresa, {headers: this.agregarAuthorizationHeader() }).pipe(
      map(response => response as Usuario[]),
      catchError(e=> {
        this.isNoAutorizado(e);
        return throwError(() => e);
      })
    ); 
      
  }

}
