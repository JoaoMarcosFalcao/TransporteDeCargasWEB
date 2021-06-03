import { Component, OnInit } from '@angular/core';
import {ViagemService} from '../viagem.service';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ViagemDto} from '../../../model/viagem-dto';
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
  selector: 'app-viagem-detalhe',
  templateUrl: './viagem-detalhe.component.html',
  styleUrls: ['./viagem-detalhe.component.css'],
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

export class ViagemDetalheComponent implements OnInit, ErrorStateMatcher {

  constructor(private viagemService: ViagemService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  viagem: ViagemDto;

  formViagem: FormGroup;

  matcher = new MyErrorStateMatcher();

  inscricao: Subscription;

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: Params) => {
        const id: number = +params.id;
        if (id) {
          this.viagemService.buscarViagensPorId(id).subscribe(dados => {
            this.viagem = dados;
            this.formViagem = this.fb.group({     // {5}
              id: [this.viagem.id],
              horaPartida: [this.viagem.horaPartida, Validators.required],
              horaChegada: [this.viagem.horaChegada, Validators.required],
              dataSaida: [this.viagem.dataSaida],
              dataChegada: [this.viagem.dataChegada],
              motorista: [this.viagem.motorista, Validators.required],
              veiculo: [this.viagem.veiculo, Validators.required],
              frete: [this.viagem.frete, Validators.required]
            });
            console.log(this.formViagem);
          }, error => {console.error(error); });
        } else {
          this.viagem = {
            id: null,
            horaPartida: '',
            horaChegada: '',
            dataSaida: null,
            dataChegada: null,
            motorista: null,
            veiculo: null,
            frete: null

          };
          this.formViagem = this.fb.group({     // {5}
            id: [this.viagem.id],
            horaPartida: [this.viagem.horaPartida, Validators.required],
            horaChegada: [this.viagem.horaChegada, Validators.required],
            dataSaida: [this.viagem.dataSaida],
            dataChegada: [this.viagem.dataChegada],
            motorista: [this.viagem.motorista, Validators.required],
            veiculo: [this.viagem.veiculo, Validators.required],
            frete: [this.viagem.frete, Validators.required]
          });
        }
      });
  }

  onSubmit(): void {
    this.viagem = this.formViagem.value;
    if (this.viagem.id === null){
      this.viagemService.salvarViagem(this.viagem).subscribe(() => {
        this.viagemService.showMessage('Viagem salva com sucesso', false);
      });
      this.router.navigate(['/viagem']);
    }else{
      this.viagemService.editarViagem(this.viagem).subscribe(() => {
        this.viagemService.showMessage('Viagem salva com sucesso', false);
      });
      this.router.navigate(['/viagem']);
    }
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return false;
  }

  get getControl(){
    return this.formViagem.controls;
  }

}
