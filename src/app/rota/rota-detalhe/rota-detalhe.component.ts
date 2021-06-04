import { Component, OnInit } from '@angular/core';
import {RotaService} from '../rota.service';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {RotaDto} from '../../../model/rota-dto';
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
  selector: 'app-rota-detalhe',
  templateUrl: './rota-detalhe.component.html',
  styleUrls: ['./rota-detalhe.component.css'],
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

export class RotaDetalheComponent implements OnInit, ErrorStateMatcher {

  constructor(private rotaService: RotaService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  rota: RotaDto;

  formRota: FormGroup;

  matcher = new MyErrorStateMatcher();

  inscricao: Subscription;

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: Params) => {
        const id: number = +params.id;
        if (id) {
          this.rotaService.buscarRotasPorId(id).subscribe(dados => {
            this.rota = dados;
            this.formRota = this.fb.group({     // {5}
              id: [this.rota.id],
              cidadeSaida: [this.rota.cidadeSaida, Validators.required],
              cidadeChegada: [this.rota.cidadeChegada, Validators.required],
              distancia: [this.rota.distancia, Validators.required],
              cidadeParadas: [this.rota.cidadesParadas, Validators.required]
            });
            console.log(this.formRota);
          }, error => {console.error(error); });
        } else {
          this.rota = {
            id: null,
            cidadeSaida: '',
            cidadeChegada: '',
            distancia: null,
            cidadesParadas:''
          };
          this.formRota = this.fb.group({     // {5}
            id: [this.rota.id],
            cidadeSaida: [this.rota.cidadeSaida, Validators.required],
            cidadeChegada: [this.rota.cidadeChegada, Validators.required],
            distancia: [this.rota.distancia, Validators.required],
            cidadeParadas: [this.rota.cidadesParadas, Validators.required]
          });
        }
      });
  }

  onSubmit(): void {
    this.rota = this.formRota.value;
    if (this.rota.id === null){
      this.rotaService.salvarRota(this.rota).subscribe(() => {
        this.rotaService.showMessage('Rota salvo com sucesso', false);
      });
      this.router.navigate(['/rota']);
    }else{
      this.rotaService.editarRota(this.rota).subscribe(() => {
        this.rotaService.showMessage('Rota salvo com sucesso', false);
      });
      this.router.navigate(['/rota']);
    }
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return false;
  }

  get getControl(){
    return this.formRota.controls;
  }

}
