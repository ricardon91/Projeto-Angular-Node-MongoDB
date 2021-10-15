import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Cliente } from 'src/models/cliente.model';
import { ClienteService } from 'src/services/cliente.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit, OnDestroy {
  clientes: Cliente[] = [];
  private clientesSubscription: Subscription;

  // @Input() clientes: Cliente[] = [];

  constructor(public clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes();
    this.clientesSubscription = this.clienteService.getListaDeClientesAtualizadaObservable()
      .subscribe((clientes: Cliente[]) => {
        this.clientes = clientes;
      });
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
  }
}
