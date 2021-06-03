import { Component, OnInit } from '@angular/core';
import {VeiculoService} from '../veiculo.service';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {VeiculoDto} from '../../../model/veiculo-dto';
import {DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-veiculo-detalhe',
  templateUrl: './veiculo-detalhe.component.html',
  styleUrls: ['./veiculo-detalhe.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class VeiculoDetalheComponent implements OnInit, ErrorStateMatcher {

  constructor(private veiculoService: VeiculoService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  veiculo: VeiculoDto;

  formVeiculo: FormGroup;

  matcher = new MyErrorStateMatcher();

  inscricao: Subscription;

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: Params) => {
        const id: number = +params.id;
        if (id) {
          this.veiculoService.buscarVeiculosPorId(id).subscribe(dados => {
            this.veiculo = dados;
            this.formVeiculo = this.fb.group({     // {5}
              id: [this.veiculo.id],
              modelo: [this.veiculo.modelo, Validators.required],
              marca: [this.veiculo.marca, Validators.required],
              ano: [this.veiculo.ano, Validators.required],
              placa: [this.veiculo.placa, Validators.required],
              RENAVAM: [this.veiculo.RENAVAM, Validators.required],
              capacidade: [this.veiculo.capacidade, Validators.required]
            });
            console.log(this.formVeiculo);
          }, error => {console.error(error); });
        } else {
          this.veiculo = {
            id: null,
            modelo: '',
            marca: '',
            ano: null,
            placa: '',
            RENAVAM: '',
            capacidade: null

          };
          this.formVeiculo = this.fb.group({     // {5}
            id: [this.veiculo.id],
            modelo: [this.veiculo.modelo, Validators.required],
            marca: [this.veiculo.marca, Validators.required],
            ano: [this.veiculo.ano, Validators.required],
            placa: [this.veiculo.placa, Validators.required],
            RENAVAM: [this.veiculo.RENAVAM, Validators.required],
            capacidade: [this.veiculo.capacidade, Validators.required]
          });
        }
      });
  }

  onSubmit(): void {
    this.veiculo = this.formVeiculo.value;
    if (this.veiculo.id === null){
      this.veiculoService.salvarVeiculo(this.veiculo).subscribe(() => {
        this.veiculoService.showMessage('Veiculo salvo com sucesso', false);
      });
      this.router.navigate(['/veiculo']);
    }else{
      this.veiculoService.editarVeiculo(this.veiculo).subscribe(() => {
        this.veiculoService.showMessage('Veiculo salvo com sucesso', false);
      });
      this.router.navigate(['/veiculo']);
    }
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return false;
  }

  get getControl(){
    return this.formVeiculo.controls;
  }

}
