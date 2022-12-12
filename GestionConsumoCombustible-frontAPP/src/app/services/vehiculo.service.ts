import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../Constantes/app-routes.constants';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import swal from 'sweetalert2';
import { ObserversModule } from '@angular/cdk/observers';
import { Vehiculo } from '../model/vehiculo';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  
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

  getSumVehiculosUsuarios(usuarioId: number): Observable<any>{

    console.log(environment.rooturl+AppConstants.GESTION_USUARIO+'/'+usuarioId+'/totalVehiculos');
    console.log('QUE LLEVA LA CONSULTA');
    console.log(this.http
      .get<number>(environment.rooturl+AppConstants.GESTION_USUARIO+'/'+usuarioId+'/totalVehiculos', {headers: this.agregarAuthorizationHeader()}));
    
    return this.http
      .get(environment.rooturl+AppConstants.GESTION_USUARIO+'/'+usuarioId+'/totalVehiculos', {headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e => {
          this.isNoAutorizado(e);
          return throwError(() => e);
        })
      );
  }

  getSumConductoresUsuarios(empresa: string): Observable<any>{

    console.log(environment.rooturl+AppConstants.OBTENER_USUARIOS+'/'+empresa+'/contar');
    console.log('QUE LLEVA LA CONSULTA');
    console.log(this.http
      .get<number>(environment.rooturl+AppConstants.OBTENER_USUARIOS+'/'+empresa+'/contar', {headers: this.agregarAuthorizationHeader()}));
    
    return this.http
      .get(environment.rooturl+AppConstants.OBTENER_USUARIOS+'/'+empresa+'/contar', {headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e => {
          this.isNoAutorizado(e);
          return throwError(() => e);
        })
      );
  }

  getVehiculos(idUsuario: number): Observable<any> {
    return this.http
      .get<Vehiculo>(environment.rooturl+AppConstants.GESTION_USUARIO+'/'+idUsuario+'/vehiculos', {headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e => {
          this.isNoAutorizado(e);
          return throwError(() => e);
        })
      )
  }

  getUsuario(idUsuario: number): Observable<Usuario> {
    return this.http
      .get<Usuario>(AppConstants.GESTION_USUARIO + '/' + idUsuario, {headers: this.agregarAuthorizationHeader()})
      .pipe(map((response) => response as Usuario));
  }

  createConductor(usuario: Usuario): Observable<Usuario> {
    console.log('EL CONDUCTOR QUE SE DA DE ALTA')
    console.log(usuario)
    return this.http.post(environment.rooturl + AppConstants.ALTA_CONDUCTOR, usuario, {headers: this.agregarAuthorizationHeader() })
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


}
