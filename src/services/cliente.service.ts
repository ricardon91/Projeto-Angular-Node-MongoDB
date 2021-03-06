import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Cliente } from "src/models/cliente.model";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })

export class ClienteService {

    private clientes: Cliente[] = [];
    private listaClienteAtualizada = new Subject<Cliente[]>()

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    getClientes(): void {
        this.httpClient.get<{ mensagem: string, clientes: any }>('http://localhost:3000/api/clientes')
            .pipe(map((dados) => {
                return dados.clientes.map((cliente: { _id: any; nome: any; fone: any; email: any; imagemURL: any }) => {
                    return {
                        id: cliente._id,
                        nome: cliente.nome,
                        fone: cliente.fone,
                        email: cliente.email,
                        imagemURL: cliente.imagemURL
                    }
                })
            }))
            .subscribe((clientes) => {
                this.clientes = clientes;
                this.listaClienteAtualizada.next([...this.clientes]);
            })
    }

    getCliente(idCliente: string) {
        return this.httpClient.get<{
            _id: string, nome: string, fone: string, email:
            string
        }>(`http://localhost:3000/api/clientes/${idCliente}`);
    }


    adicionarCliente(nome: string, fone: string, email: string, imagem: File) {
        // const cliente: Cliente = {
        //     id: '',
        //     nome: nome,
        //     fone: fone,
        //     email: email
        // };
        const dadosCliente = new FormData();
        dadosCliente.append("nome", nome);
        dadosCliente.append('fone', fone);
        dadosCliente.append('email', email);
        dadosCliente.append('imagem', imagem);
        this.httpClient.post<{ mensagem: string, cliente: Cliente}>('http://localhost:3000/api/clientes', dadosCliente)
            .subscribe((dados) => {
                // cliente.id = dados.id
                const cliente: Cliente = {
                    id: dados.cliente.id,
                    nome: nome,
                    fone: fone,
                    email: email,
                    imagemURL: dados.cliente.imagemURL
                };
                console.log(dados.mensagem);
                this.clientes.push(cliente);
                this.listaClienteAtualizada.next([...this.clientes]);
                this.router.navigate(['/']);
            })
    }

    atualizarCliente(id: string, nome: string, fone: string, email: string) {
        const cliente: Cliente = { id, nome, fone, email, imagemURL: null};
        this.httpClient.put(`http://localhost:3000/api/clientes/${id}`, cliente)
            .subscribe((res => {
                const copia = [...this.clientes];
                const indice = copia.findIndex(cli => cli.id === cliente.id);
                copia[indice] = cliente;
                this.clientes = copia;
                this.listaClienteAtualizada.next([...this.clientes]);
                this.router.navigate(['/']);
            }));
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