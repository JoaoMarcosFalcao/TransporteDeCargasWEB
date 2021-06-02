import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import { CargaDto } from 'src/model/Carga-dto';
import { CargaService } from '../../carga.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  constructor(
    private cargaService: CargaService,
    private location: Location,
    private router: Router
  ) { }
  displayedColumns: string[] = ['id', 'peso', 'altura', 'comprimento', 'largura', 'pesoOcupado', 'tipoCarga', 'acoes'];

  carga: CargaDto = {
    id: 1,
    peso: 200,
    altura: 1.5,
    comprimento: 2.5,
    largura: 1.8,
    pesoOcupado: 596,
    tipoCarga: "Não Frágil",
  };
  cargas: CargaDto[];

  dataSource;

  ngOnInit(): void {
    this.cargaService.listarCargas().subscribe(dados => {
      this.cargas = dados;
      this.dataSource = this.cargas;
    });
  }

  salvar(): void {
    this.cargaService.salvarCarga(this.carga).subscribe((dados) => {
      this.cargaService.showMessage('Carga salva com sucesso!', false);
      this.cargas.push(dados);
      this.dataSource = this.cargas;
      location.reload();
    });
  }
  editarCarga(carga: CargaDto): void {
    this.router.navigate(['/carga-detalhe', carga.id]);
  }

  deletarCarga(carga: CargaDto): void {
    this.cargaService.deletarCarga(carga.id);
  }
}

