import { Component } from '@angular/core';
import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mongodb';
  clientes: Cliente[] = [];

  onClienteAdicionado(cliente: any) {
    this.clientes = [...this.clientes, cliente];
  }
}
