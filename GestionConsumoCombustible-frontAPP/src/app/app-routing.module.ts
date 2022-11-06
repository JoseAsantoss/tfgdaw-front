import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginConductorComponent } from './seguridad/login-conductor/login-conductor.component';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';

const routes: Routes = [
  { path: 'registrar', component: RegistrarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loginConductor', component: LoginConductorComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
