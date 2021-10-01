import { Subject } from "rxjs";
import { Cliente } from "src/models/cliente.model";

export class ClienteService {

    private clientes: Cliente[] = [];
    private listaClienteAtualizada = new Subject<Cliente[]>()

    getClientes(): Cliente[] {
        return [...this.clientes];
    }

    adicionarCliente(nome: string, fone: string, email: string) {
        const cliente: Cliente = {
            nome: nome,
            fone: fone,
            email: email,
        };
        this.clientes.push(cliente);
        this.listaClienteAtualizada.next([...this.clientes])
    }

    getListaDeClientesAtualizadaObservable() {
        return this.listaClienteAtualizada.asObservable();
    }
}