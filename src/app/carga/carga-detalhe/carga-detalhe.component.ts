import { Component, OnInit } from '@angular/core';
import {CargaService} from '../carga.service';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {CargaDto} from '../../../model/carga-dto';
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
  selector: 'app-carga-detalhe',
  templateUrl: './carga-detalhe.component.html',
  styleUrls: ['./carga-detalhe.component.css'],
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

export class CargaDetalheComponent implements OnInit, ErrorStateMatcher {

  constructor(private cargaService: CargaService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  carga: CargaDto;

  formCarga: FormGroup;

  matcher = new MyErrorStateMatcher();

  inscricao: Subscription;

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: Params) => {
        const id: number = +params.id;
        if (id) {
          this.cargaService.buscarCargasPorId(id).subscribe(dados => {
            this.carga = dados;
            this.formCarga = this.fb.group({     // {5}
              id: [this.carga.id],
              peso: [this.carga.peso, Validators.required],
              altura: [this.carga.altura, Validators.required],
              comprimento: [this.carga.comprimento, Validators.required],
              largura: [this.carga.largura, Validators.required],
              pesoCubado: [this.carga.pesoCubado, Validators.required],
              tipoCarga: [this.carga.tipoCarga, Validators.required]
            });
            console.log(this.formCarga);
          }, error => {console.error(error); });
        } else {
          this.carga = {
            id: null,
            peso: null,
            altura: null,
            comprimento: null,
            largura: null,
            pesoCubado: null,
            tipoCarga: '',
          };
          this.formCarga = this.fb.group({     // {5}
            id: [this.carga.id],
            peso: [this.carga.peso, Validators.required],
            altura: [this.carga.altura, Validators.required],
            comprimento: [this.carga.comprimento, Validators.required],
            largura: [this.carga.largura, Validators.required],
            pesoCubado: [this.carga.pesoCubado, Validators.required],
            tipoCarga: [this.carga.tipoCarga, Validators.required]
          });
        }
      });
  }

  onSubmit(): void {
    this.carga = this.formCarga.value;
    if (this.carga.id === null){
      this.cargaService.salvarCarga(this.carga).subscribe(() => {
        this.cargaService.showMessage('Carga salva com sucesso', false);
      });
      this.router.navigate(['/carga']);
    }else{
      this.cargaService.editarCarga(this.carga).subscribe(() => {
        this.cargaService.showMessage('Carga salva com sucesso', false);
      });
      this.router.navigate(['/carga']);
    }
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return false;
  }

  get getControl(){
    return this.formCarga.controls;
  }

}
