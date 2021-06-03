import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import { TelefoneDto } from 'src/model/Telefone-dto';
import { TelefoneService } from '../telefone.service';


@Component({
  selector: 'app-telefone',
  templateUrl: './telefone.component.html',
  styleUrls: ['./telefone.component.css']
})
export class TelefoneComponent implements OnInit {

  constructor(
    private telefoneService: TelefoneService,
    private location: Location,
    private router: Router
  ) { }
  displayedColumns: string[] = ['id', 'codigoArea', 'DDD', 'numero', 'acoes'];

  telefone: TelefoneDto = {
    id: 1,
    codigoArea: 55,
    DDD: 66,
    numero: '98445-2547',
  };
  telefones: TelefoneDto[];

  dataSource;

  ngOnInit(): void {
    this.telefoneService.listarTelefones().subscribe(dados => {
      this.telefones = dados;
      this.dataSource = this.telefones;
    });
  }

  salvar(): void {
    this.telefoneService.salvarTelefone(this.telefone).subscribe((dados) => {
      this.telefoneService.showMessage('Telefone salvo com sucesso!', false);
      this.telefones.push(dados);
      this.dataSource = this.telefones;
      location.reload();
    });
  }
  editarTelefone(telefone: TelefoneDto): void {
    this.router.navigate(['/telefone-detalhe', telefone.id]);
  }

  deletarTelefone(telefone: TelefoneDto): void {
    this.telefoneService.deletarTelefone(telefone.id);
  }
}

