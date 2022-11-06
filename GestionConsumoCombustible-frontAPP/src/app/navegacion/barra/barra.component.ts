import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
//import { SeguridadService } from '../../seguridad/seguridad.service';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();
  estadoUsuario: boolean = false;
  usuarioSubscription: Subscription = new Subscription;

  //constructor(private seguridadService: SeguridadService) { }
 
  constructor(){}

  ngOnInit(): void {
    //this.usuarioSubscription = this.seguridadService.seguridadCambio.subscribe( status => {
      //this.estadoUsuario = status;
    //});
  }

  ngOnDestroy(): void {
     //this.usuarioSubscription.unsubscribe();
  }

  onMenuToggleDispatch(){
    this.menuToggle.emit();
  }

  terminarSesion() {
    //this.seguridadService.salirSesion();
  }

}