import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import { RotaDto } from 'src/model/Rota-dto';
import { RotaService } from '../rota.service';


@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.css']
})
export class RotaComponent implements OnInit {

  constructor(
    private rotaService: RotaService,
    private location: Location,
    private router: Router
  ) { }
  displayedColumns: string[] = ['id', 'cidadeSaida', 'cidadeChegada', 'distancia','cidadesParadas', 'acoes'];

  rota: RotaDto = {
    id: 0,
    cidadeSaida: 'BG',
    cidadeChegada: 'Vila Rica',
    distancia: 600,
    cidadesParadas: 'Agua Boa, Sorriso, Ituiba'
  };
  rotas: RotaDto[];

  dataSource;

  ngOnInit(): void {
    this.rotaService.listarRotas().subscribe(dados => {
      this.rotas = dados;
      this.dataSource = this.rotas;
    });
  }

  salvar(): void {
    this.rotaService.salvarRota(this.rota).subscribe((dados) => {
      this.rotaService.showMessage('Rota salvo com sucesso!', false);
      this.rotas.push(dados);
      this.dataSource = this.rotas;
      location.reload();
    });
  }
  editarRota(rota: RotaDto): void {
    this.router.navigate(['/rota-detalhe', rota.id]);
  }

  deletarRota(rota: RotaDto): void {
    this.rotaService.deletarRota(rota.id);
  }
}

