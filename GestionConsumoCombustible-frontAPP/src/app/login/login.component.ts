import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = 'Acceso Usuarios';
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.usuario);
    let mail = this.usuario.email;
    let pass = this.usuario.password;
    console.log(mail);
    console.log(pass);
    
    
    if(mail == null || mail == '' || mail == undefined || pass == null || pass == '' || pass == undefined) {
      swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe({
      next: (response) => {
        console.log(response);
  
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario = this.authService.usuario;
  
        this.router.navigate(['/usuario'])
          .then(nav => {
            console.log('JOPUTA');
            
            console.log(this.router.url)
            console.log(nav);
            
          }), (err: any) => {
            console.log(err);
            
          };
        swal.fire('Login', `Hola ${usuario.nombre}, has iniciado sesión con éxito`, 'success' );
      },
      error: (e) => {
        if(e.status == 400) {
          swal.fire('Error Login', 'Usuario o clave incorrectas', 'error');
        }
      }
    })
    
  }

}

