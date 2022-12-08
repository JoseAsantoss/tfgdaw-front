import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    
    let role: string = next.data['role'];

    if (this.authService.hasRole(role)) {
      return true;
    }
    
    swal.fire('Acceso denegado', `Hola ${this.authService.getusuario().usuarioNombre} no tienes acceso a este recurso!`, 'warning');
    this.router.navigate(['/login']);
    return false;
  }
}
