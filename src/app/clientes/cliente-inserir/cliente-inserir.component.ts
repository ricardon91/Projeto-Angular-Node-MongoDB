import {Component, EventEmitter, Output} from "@angular/core";
import { Cliente } from "src/models/cliente.model";


@Component({
    selector: 'app-cliente-inserir',
    templateUrl:'./cliente-inserir.component.html',
    styleUrls:['./cliente-inserir.component.css']
})

export class ClienteInserirComponent{

    @Output() clienteAdicionado = new EventEmitter<Cliente>();

    nome= ''
    fone= '';
    email= '';

    adicionarCliente(){
        const cliente: Cliente = {
            nome: this.nome,
            fone: this.fone,
            email: this.email
        };

        this.clienteAdicionado.emit(cliente);
    }

    
}