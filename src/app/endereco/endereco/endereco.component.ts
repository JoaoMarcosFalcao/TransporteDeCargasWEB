import { Component, OnInit } from '@angular/core';
import {EnderecoDto} from '../../../model/endereco-dto';
import {EnderecoService } from '../endereco.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';


@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

   constructor(
  private enderecoService: EnderecoService,
  private location: Location,
  private router: Router
) { }
  displayedColumns: string[] = ['id', 'rua', 'complemento','numero', 'bairro', 'cidade', 'estado', 'acoes'];

  endereco: EnderecoDto = {

    id: 1,
    rua: 'Rua B',
    numero: '17',
    complemento: 'casa',
    bairro: 'Serra Alta',
    cidade: 'Barra do Garcas',
    estado: 'Mato Grosso',
  };

  enderecos: EnderecoDto[];

  dataSource;

  ngOnInit(): void {
    this.enderecoService.listarEnderecos().subscribe(dados => {
      this.enderecos = dados;
      this.dataSource = this.enderecos;
    });
  }

  salvar(): void {
    this.enderecoService.salvarEndereco(this.endereco).subscribe((dados) => {
      this.enderecoService.showMessage('Endereco Salvo com sucesso!', false);
      this.enderecos.push(dados);
      this.dataSource = this.enderecos;
      location.reload();
    });
  }
  editarEndereco(Endereco: EnderecoDto): void {
    this.router.navigate(['/endereco-detalhe', Endereco.id]);
  }

  deletarEndereco(Endereco: EnderecoDto): void {
    this.enderecoService.deletarEndereco(Endereco.id);
  }
}

