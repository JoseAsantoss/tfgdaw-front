import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
//import { SeguridadService } from '../../seguridad/seguridad.service';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css']
})
export class MenuListaComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();
  estadoUsuario!: boolean;
  usuarioSubscription: Subscription = new Subscription;

  //constructor(private seguridadService: SeguridadService) { }

  constructor() { }

  ngOnInit(): void {
    //this.usuarioSubscription = this.seguridadService.seguridadCambio.subscribe( status => {
      //this.estadoUsuario = status;
    //})
  }

  ngOnDestroy(): void {
    //this.usuarioSubscription.unsubscribe();
  }

  onCerrarMenu() {
    this.menuToggle.emit();
  }

  terminarSesionMenu(){
    this.onCerrarMenu();
    //this.seguridadService.salirSesion();
  }

}
