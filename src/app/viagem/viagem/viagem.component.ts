import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import { ViagemDto } from 'src/model/Viagem-dto';
import { ViagemService } from '../viagem.service';


@Component({
  selector: 'app-viagem',
  templateUrl: './viagem.component.html',
  styleUrls: ['./viagem.component.css']
})
export class ViagemComponent implements OnInit {

  constructor(
    private viagemService: ViagemService,
    private location: Location,
    private router: Router
  ) { }
  displayedColumns: string[] = ['id', 'horaPartida', 'dataSaida','dataChegada','horaChegada', 'veiculo', 'motorista','frete', 'acoes'];

  viagem: ViagemDto = {
    id: 1,
    horaPartida: '13:00',
    horaChegada: '19:30',
    dataSaida: new Date(),
    dataChegada: new Date,
    veiculo: 1,
    motorista: 1,
    frete: 2.000
  };
  viagems: ViagemDto[];

  dataSource;

  ngOnInit(): void {
    this.viagemService.listarViagens().subscribe(dados => {
      this.viagems = dados;
      this.dataSource = this.viagems;
    });
  }

  salvar(): void {
    this.viagemService.salvarViagem(this.viagem).subscribe((dados) => {
      this.viagemService.showMessage('Viagem salvo com sucesso!', false);
      this.viagems.push(dados);
      this.dataSource = this.viagems;
      location.reload();
    });
  }
  editarViagem(viagem: ViagemDto): void {
    this.router.navigate(['/viagem-detalhe', viagem.id]);
  }

  deletarViagem(viagem: ViagemDto): void {
    this.viagemService.deletarViagem(viagem.id);
  }
}

