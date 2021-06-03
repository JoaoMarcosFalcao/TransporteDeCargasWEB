import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import { VeiculoDto } from 'src/model/Veiculo-dto';
import { VeiculoService } from '../veiculo.service';


@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {

  constructor(
    private veiculoService: VeiculoService,
    private location: Location,
    private router: Router
  ) { }
  displayedColumns: string[] = ['id', 'modelo', 'marca', 'ano', 'placa', 'RENAVAM', 'capacidade', 'acoes'];

  veiculo: VeiculoDto = {
    id: 1,
    modelo: 'T-2000',
    marca: 'Volvo',
    ano: 2021,
    placa: 'FR84EW2',
    RENAVAM: "51754851245",
    capacidade: 2000
  };
  veiculos: VeiculoDto[];

  dataSource;

  ngOnInit(): void {
    this.veiculoService.listarVeiculos().subscribe(dados => {
      this.veiculos = dados;
      this.dataSource = this.veiculos;
    });
  }

  salvar(): void {
    this.veiculoService.salvarVeiculo(this.veiculo).subscribe((dados) => {
      this.veiculoService.showMessage('Veiculo salvo com sucesso!', false);
      this.veiculos.push(dados);
      this.dataSource = this.veiculos;
      location.reload();
    });
  }
  editarVeiculo(veiculo: VeiculoDto): void {
    this.router.navigate(['/veiculo-detalhe', veiculo.id]);
  }

  deletarVeiculo(veiculo: VeiculoDto): void {
    this.veiculoService.deletarVeiculo(veiculo.id);
  }
}

