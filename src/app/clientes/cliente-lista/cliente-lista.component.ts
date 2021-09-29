import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente.model';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  @Input() clientes: Cliente[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
