import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { Rol } from '../model/rol';
import { Usuario } from '../model/usuario';
import { Vehiculo } from '../model/vehiculo';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { VehiculoService } from '../services/vehiculo.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario | null;
  numVehiculos!: number;
  numConductores!: number;
  nombreRazonSocial!: string;
  perfil: string = '';
  listaVehículos: Array<Vehiculo> = [];
  conductores: Usuario[] = [];
  contador = 0;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private vehiculoService: VehiculoService
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.usuario = this.authService.getusuario();

    this.asignaPerfil(this.usuario.roles);
  
    if (this.usuario.roles.toString() !== 'ROLE_PARTICULAR' &&
    this.usuario.roles.toString() !== 'ROLE_ADMIN') {
      this.cargarNumConductores(this.usuario);
    }
    
    if (this.usuario.roles.toString() !== 'ROLE_ADMIN') {
      this.cargarNumVehiculos(this.usuario);
    }
    
    this.cargarListadoVehiculos(this.usuario);

    this.cargarListadoConductores(this.usuario);
    
  }

  cargarNumConductores(usuario: Usuario): void {
    this.vehiculoService
    .getSumConductoresUsuarios(usuario.empresa.cif)
    .subscribe({
      next: (response) => {
        this.numConductores = response;
        console.log('response' + JSON.stringify(response));
      },
    });

  }

  cargarNumVehiculos(usuario: Usuario): void {
    let obs: Observable<any> = this.vehiculoService.getSumVehiculosUsuarios(
      usuario.usuarioId
    );
    obs.subscribe({
      next: (respuesta) => {
        this.numVehiculos = respuesta;
        console.log('respuesta' + JSON.stringify(respuesta));
      },
    });
  }

  cargarListadoVehiculos(usuario: Usuario): void {
    this.vehiculoService.getVehiculos(usuario.usuarioId).subscribe({
      next: (response) => {
        this.listaVehículos = response;
        console.log('LISTADO DE VEHICULOS');
        
        console.log(this.listaVehículos);
      },
    });
  }

  cargarListadoConductores(usuario: Usuario): void {
    this.usuarioService.getConductores(usuario.empresa.cif).subscribe({
      //conductores => this.conductores = conductores
      next: (conductores) => {
        this.conductores = conductores;
        console.log('HASTA LOS PUTOS HUEVOS');
        console.log(this.conductores);
      }
  });
  }

  asignaPerfil(rol: Rol[]): void {
    rol.forEach((r) => {
      if (r.toString() === 'ROLE_EMPRESA') {
        this.perfil = 'Usuario de empresa';
      }

      if (r.toString() === 'ROLE_PARTICULAR') {
        this.perfil = 'Usuario particular';
      }

      if (r.toString() === 'ROLE_ADMIN') {
        this.perfil === 'Usuario Administrador';
      }
    });
  }

  isEmpresa(): boolean {
    let emp: boolean = false;
    this.usuario!.roles.forEach((r) => {
      if (r.toString() === 'ROLE_EMPRESA') {
        emp = true;
      }
    });
    return emp;
  }

  getNumVehiculos(): number {
    console.log(this.numVehiculos);
    
    return this.numVehiculos;
  }

  getNumConductores(): number {
    return this.numConductores;
  }

  mostrarPerfil(): string {
    return this.perfil;
  }

  mostarUltimosVehiculos(): Array<Vehiculo> {
    let cont: number = 0;
    let mostrar: Array<Vehiculo> = [];
    this.listaVehículos.forEach((v) => {
      if (cont < 4) {
        mostrar.push(v);
        cont++;
      }
    });
    return mostrar;
  }

  mostrarUltimosConductores(): Usuario[] {
    let cont: number = 0;
    let mostrar: Usuario[] = [];
    console.log('valor de this.conductores en la funcion');
    console.log(this.conductores);
    
    
    this.conductores.forEach(c => {
      if(cont<4) {
        mostrar.push(c);
      }
    });

    console.log('la lista reducida '+ mostrar);
    
    return mostrar;
  }

  tamanioLista(): number {
    return this.conductores.length
  }

}
