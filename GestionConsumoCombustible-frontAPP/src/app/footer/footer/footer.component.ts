import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public autores: any[] = [
    {nombre: 'Luis', apellido: 'Cifuentes'},
    {nombre: 'Jose A.', apellido: 'Santos'}
  ];

  public centro: string = 'Instituto Tecnológico EDIX';

  constructor() { }

  ngOnInit(): void {
  }

}
