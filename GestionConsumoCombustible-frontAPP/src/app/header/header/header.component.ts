import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/model/rol';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  closeSession(): void {
    this.authService.logout();
  }

  isLogueado(): boolean {
    if (this.authService.token !== '') {
      return true;
    }else {
      return false;
    }
  }

  verRol(): string {    

    let nivel: string = '';

    if (this.authService.isAuthenticated()){      
      this.authService.getusuario().roles.forEach( r => {
        nivel = r.toString();  
      });
    }
    return nivel;
  }

}
