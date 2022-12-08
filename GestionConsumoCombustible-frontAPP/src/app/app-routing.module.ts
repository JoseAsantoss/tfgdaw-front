import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './login/login.component';
import { FormularioAddUsuarioComponent } from './pages/formularios/formulario-add-usuario/formulario-add-usuario.component';
import { UsuarioDriverComponent } from './usuario/usuario-driver.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard, RoleGuard],
    data: {role: environment.ROL_NO_CONDUCTOR}},
  {path: 'usuario/add-conductor', component: FormularioAddUsuarioComponent, canActivate: [AuthGuard, RoleGuard],
    data: {role: environment.ROL_EMPRESA_PARTICULAR}},
  {path: 'usuario-driver', component: UsuarioDriverComponent, canActivate: [AuthGuard, RoleGuard],
  data: {role: environment.ROL_CONDUCTOR}},
  {path: 'usuario/usuarios', component: UsuariosComponent, canActivate: [AuthGuard, RoleGuard],
    data: {role: environment.ROL_NO_CONDUCTOR}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
