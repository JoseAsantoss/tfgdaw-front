import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { AppConstants } from '../Constantes/app-routes.constants';
import { LoginComponent } from '../login/login.component';
import { Rol } from '../model/rol';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario!: Usuario | null;
  private _token!: string;
  private _userRol!: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')!) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token')!;
      return this._token;
    }
    return '';
  }

  login(usuario: Usuario): Observable<any> {
    const urlEndpoint = 'http://localhost:8086/oauth/token';
    const credenciales = btoa('gccapp'.concat(':').concat('12345')); 
    
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.email);
    params.set('password', usuario.password);
    console.log("lo que lleva params");
    
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  guardarUsuario(accessToken: string): void {
    console.log('EL ACCES TOKEN');
    console.log(accessToken);
    let payload = this.obtenerDatosToken(accessToken);
    console.log('EL PUTO PAYLOAD');
    console.log(payload);
    
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido1 = payload.apellido1;
    this._usuario.apellido2 = payload.apellido2;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    payload.authorities.forEach((rol: any) => {
      this._userRol = rol;
    });;
    this._usuario.roles = this._userRol;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    console.log('LOS PUTOS ROLES DEL USUARIO');
    console.log(this.usuario.roles);
    console.log('QUE PUTO ROLE ESTÁ PASANDO');
    console.log(role);
    
    if (role.includes(this.usuario.roles)) {
      console.log('POR COJONES TENGO QUE ENTRAR AQUÍ');
      
      return true;
    }

    return false;
  }

  logout(): void {
    this._token = '';
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
}
