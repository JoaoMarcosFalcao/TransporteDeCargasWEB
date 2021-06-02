import { Component, OnInit } from '@angular/core';
import {ClienteDto} from '../../../model/cliente-dto';
import {ClienteService} from '../cliente.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(
    private clienteService: ClienteService,
    private location: Location,
    private router: Router
  ) { }
  displayedColumns: string[] = ['id', 'nome', 'email', 'cpf', 'endereco_id', 'acoes'];

  cliente: ClienteDto = {
    id: 1,
    nome: 'Paulo',
    email: 'paulo@hotmail.com',
    cpf: '058.987.465-82',
    endereco_id: 1,
  };
  clientes: ClienteDto[];

  dataSource;

  ngOnInit(): void {
    this.clienteService.listarClientes().subscribe(dados => {
      this.clientes = dados;
      this.dataSource = this.clientes;
    });
  }

  salvar(): void {
    this.clienteService.salvarCliente(this.cliente).subscribe((dados) => {
      this.clienteService.showMessage('Cliente Salvo com sucesso!', false);
      this.clientes.push(dados);
      this.dataSource = this.clientes;
      location.reload();
    });
  }
  editarCliente(cliente: ClienteDto): void {
    this.router.navigate(['/cliente-detalhe', cliente.id]);
  }

  deletarCliente(cliente: ClienteDto): void {
    this.clienteService.deletarCliente(cliente.id);
  }
}

