import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Cliente } from "src/models/cliente.model";
import { ClienteService } from "src/services/cliente.service";

@Component({
    selector: 'app-cliente-inserir',
    templateUrl: './cliente-inserir.component.html',
    styleUrls: ['./cliente-inserir.component.css']
})

export class ClienteInserirComponent implements OnInit {

    private modo: string = "criar";
    private idCliente: string | null = null;
    public cliente: Cliente | undefined;
    public estaCarregando: boolean = false;
    form: FormGroup

    constructor(public clienteService: ClienteService, public route: ActivatedRoute) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            nome: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            fone: new FormControl(null, {
                validators: [Validators.required]
            }),
            email: new FormControl(null, {
                validators: [Validators.required, Validators.email]
            })
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("idCliente")) {
                this.modo = "editar",
                    this.idCliente = paramMap.get("idCliente");
                this.estaCarregando = true;
                this.clienteService.getCliente(this.idCliente!).subscribe(dadosCli => {
                    this.estaCarregando = false;
                    this.cliente = {
                        id: dadosCli._id,
                        nome: dadosCli.nome,
                        fone: dadosCli.fone,
                        email: dadosCli.email
                    };
                    this.form.setValue({
                        nome: this.cliente.nome,
                        fone: this.cliente.fone,
                        email: this.cliente.email
                    })
                });
            } else {
                this.modo = "criar";
                this.idCliente = null;
            }
        });
    }

    adicionarCliente() {
        debugger
        if (this.form.invalid) {
            return;
        }
        this.estaCarregando = true;
        if (this.modo === "criar") {
            this.clienteService.adicionarCliente(
                this.form.value.nome,
                this.form.value.fone,
                this.form.value.email
            );
        } else {
            this.clienteService.atualizarCliente(
                this.idCliente!,
                this.form.value.nome,
                this.form.value.fone,
                this.form.value.email
            )
        }

        debugger
        this.form.reset();
    }
}