import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Cliente } from "src/models/cliente.model";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class ClienteService {

    private clientes: Cliente[] = [];
    private listaClienteAtualizada = new Subject<Cliente[]>()

    constructor(private httpClient: HttpClient) {
    }

    getClientes(): void {
        this.httpClient.get<{ mensagem: string, clientes: any }>('http://localhost:3000/api/clientes')
            .pipe(map((dados) => {
                return dados.clientes.map((cliente: { _id: any; nome: any; fone: any; email: any; }) => {
                    return {
                        id: cliente._id,
                        nome: cliente.nome,
                        fone: cliente.fone,
                        email: cliente.email
                    }
                })
            }))
            .subscribe((clientes) => {
                this.clientes = clientes;
                this.listaClienteAtualizada.next([...this.clientes]);
            })
    }

    adicionarCliente(nome: string, fone: string, email: string) {
        const cliente: Cliente = {
            id: '',
            nome: nome,
            fone: fone,
            email: email
        };
        this.httpClient.post<{ mensagem: string, id: string }>('http://localhost:3000/api/clientes', cliente)
        .subscribe((dados) => {
            cliente.id = dados.id
            console.log(dados.mensagem);
            this.clientes.push(cliente);
            this.listaClienteAtualizada.next([...this.clientes])
        })
    }

    removerCliente(id: string): void {
        this.httpClient.delete(`http://localhost:3000/api/clientes/${id}`).subscribe(() => {
            this.clientes = this.clientes.filter((cli) => {
                return cli.id !== id
            });
            this.listaClienteAtualizada.next([...this.clientes]);
        });
    }

    getListaDeClientesAtualizadaObservable() {
        return this.listaClienteAtualizada.asObservable();
    }
}