import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioService } from './services/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { ListadoVehiculosComponent } from './pages/vistas/listado-vehiculos/listado-vehiculos.component';
import { ListadoConductoresComponent } from './pages/vistas/listado-conductores/listado-conductores.component';
import { FormularioAddUsuarioComponent } from './pages/formularios/formulario-add-usuario/formulario-add-usuario.component';
import { FormularioAddVehiculoComponent } from './pages/formularios/formulario-add-vehiculo/formulario-add-vehiculo.component';
import { FormularioAddRepostajesComponent } from './pages/formularios/formulario-add-repostajes/formulario-add-repostajes.component';
import { FormularioAddMantenimientosComponent } from './pages/formularios/formulario-add-mantenimientos/formulario-add-mantenimientos.component';
import { ListadoMantenimientosComponent } from './pages/vistas/listado-mantenimientos/listado-mantenimientos.component';
import { ListadoRepostajesComponent } from './pages/vistas/listado-repostajes/listado-repostajes.component';
import { UsuarioDriverComponent } from './usuario/usuario-driver.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsuariosComponent,
    UsuarioComponent,
    LoginComponent,
    ListadoVehiculosComponent,
    ListadoConductoresComponent,
    FormularioAddUsuarioComponent,
    FormularioAddVehiculoComponent,
    FormularioAddRepostajesComponent,
    FormularioAddMantenimientosComponent,
    ListadoMantenimientosComponent,
    ListadoRepostajesComponent,
    UsuarioDriverComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [UsuarioService, {provide: LOCALE_ID, useValue: 'es-ES'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
