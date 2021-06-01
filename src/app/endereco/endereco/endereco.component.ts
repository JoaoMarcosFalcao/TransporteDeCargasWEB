import { Component, OnInit } from '@angular/core';
import {EnderecoDto} from '../../../model/endereco-dto';
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
  displayedColumns: string[] = ['id', 'rua', 'numero', 'bairro', 'cidade', 'estado', 'acoes'];

  endereco: EnderecoDto = {
    id: 1,
    rua: 'Rua B',
    numero: '17',
    bairro: 'Serra Alta',
    cidade: 'Barra do Garcas',
    estado: 'Mato Grosso',
  };

  Enderecos: EnderecoDto[];

  dataSource;

  ngOnInit(): void {
    this.EnderecoService.listarEnderecos().subscribe(dados => {
      this.Enderecos = dados;
      this.dataSource = this.Enderecos;
    });
  }

  salvar(): void {
    this.EnderecoService.salvarEndereco(this.Endereco).subscribe((dados) => {
      this.EnderecoService.showMessage('Endereco Salvo com sucesso!', false);
      this.Enderecos.push(dados);
      this.dataSource = this.Enderecos;
      location.reload();
    });
  }
  editarEndereco(Endereco: EnderecoDto): void {
    this.router.navigate(['/Endereco-detalhe', Endereco.id]);
  }

  deletarEndereco(Endereco: EnderecoDto): void {
    this.EnderecoService.deletarEndereco(Endereco.id);
  }
}


}
