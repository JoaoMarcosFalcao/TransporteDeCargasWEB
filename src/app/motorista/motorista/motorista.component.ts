import { Component, OnInit } from '@angular/core';
import {MotoristaDto} from '../../../model/motorista-dto';
import {MotoristaService } from '../motorista.service';
import {DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.component.html',
  styleUrls: ['./motorista.component.css']
})
export class MotoristaComponent implements OnInit {

  constructor(
    private motoristaService: MotoristaService,
    private location: Location,
    private router: Router
  ) { }
  displayedColumns: string[] = ['id', 'nome', 'email','endereco', 'cnh', 'validadecnh', 'acoes'];

  motorista: MotoristaDto = {
    id: 1,
    nome: 'Jorge Almeira',
    email: 'jorgealmeida@hotmail.com',
    endereco: 1,
    cnh: '789425484842',
    validadecnh: new Date()
 };
  motoristas: MotoristaDto[];

  dataSource;

  ngOnInit(): void {
    this.motoristaService.listarMotoristas().subscribe(dados => {
      this.motoristas = dados;
      this.dataSource = this.motoristas;
    });
  }

  salvar(): void {
    this.motoristaService.salvarMotorista(this.motorista).subscribe((dados) => {
      this.motoristaService.showMessage('Motorista Salvo com sucesso!', false);
      this.motoristas.push(dados);
      this.dataSource = this.motoristas;
      location.reload();
    });
  }
  editarMotorista(motorista: MotoristaDto): void {
    this.router.navigate(['/motorista-detalhe', motorista.id]);
  }

  deletarMotorista(motorista: MotoristaDto): void {
    this.motoristaService.deletarMotorista(motorista.id);
  }
}

