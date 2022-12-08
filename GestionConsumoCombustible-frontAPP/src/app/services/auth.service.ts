import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { AppConstants } from '../Constantes/app-routes.constants';
import { LoginComponent } from '../login/login.component';
import { Rol } from '../model/rol';
import { Empresa } from '../model/empresa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario!: Usuario | null;
  private _token!: string;
  private _userRol!: string;
  //private _userEmp!: Empresa;

  constructor(private http: HttpClient) {}

  public getusuario(): Usuario {
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
    //const credenciales = btoa('gccapp'.concat(':').concat('12345')); 
    
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + environment.CREDENTIALS_APP_AUTH
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.usuarioEmail);
    params.set('password', usuario.password);
    console.log("lo que lleva params");
    console.log(params.toString());

    return this.http.post<any>(environment.URL_AUTH, params.toString(), { headers: httpHeaders });
  }

  guardarUsuario(accessToken: string): void {
    console.log('EL ACCES TOKEN');
    console.log(accessToken);
    let payload = this.obtenerDatosToken(accessToken);
    console.log('EL PUTO PAYLOAD');
    console.log(payload.nombre);
    
    let user = new Usuario();
    this._usuario = user;
    this._usuario.usuarioNombre = payload.nombre;
    this._usuario.usuarioApellido1 = payload.apellido;
    //this._usuario.apellido2 = payload.apellido2;
    this._usuario.usuarioEmail = payload.email;
    this._usuario.empresa = payload.empresa;
    this._usuario.roles = payload.authorities;
    console.log('lo que cargo en roles del payload')
    console.log(this._usuario!.roles);
    
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

  hasRole(role?: string): boolean {
    let rol: string = '';

    console.log('QUE LE PASA AL ROLE');
    console.log(role);
    
    

    this._usuario?.roles.forEach(r => {
      rol = r.toString();
    });

    if (role?.includes(rol)) {
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
