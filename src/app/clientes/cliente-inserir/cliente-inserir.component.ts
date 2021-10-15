import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ClienteService } from "src/services/cliente.service";
import { Cliente } from "src/models/cliente.model";


@Component({
    selector: 'app-cliente-inserir',
    templateUrl: './cliente-inserir.component.html',
    styleUrls: ['./cliente-inserir.component.css']
})

export class ClienteInserirComponent {

    constructor(public clienteService: ClienteService) { }

    // @Output() clienteAdicionado = new EventEmitter<Cliente>();

    // nome= '';
    // fone= '';
    // email= '';

    adicionarCliente(form: NgForm) {
        if (form.invalid) {
            return;
        }

        this.clienteService.adicionarCliente(
            form.value.nome,
            form.value.fone,
            form.value.email
        );
        form.resetForm();

        // const cliente: Cliente = {
        //     nome: form.value.nome,
        //     fone: form.value.fone,
        //     email: form.value.email
        // };

        // this.clienteAdicionado.emit(cliente);
    }
}