import { Component, OnInit } from '@angular/core';
import {TelefoneService} from '../telefone.service';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {TelefoneDto} from '../../../model/telefone-dto';
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
  selector: 'app-telefone-detalhe',
  templateUrl: './telefone-detalhe.component.html',
  styleUrls: ['./telefone-detalhe.component.css'],
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

export class TelefoneDetalheComponent implements OnInit, ErrorStateMatcher {

  constructor(private telefoneService: TelefoneService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  telefone: TelefoneDto;

  formTelefone: FormGroup;

  matcher = new MyErrorStateMatcher();

  inscricao: Subscription;

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: Params) => {
        const id: number = +params.id;
        if (id) {
          this.telefoneService.buscarTelefonesPorId(id).subscribe(dados => {
            this.telefone = dados;
            this.formTelefone = this.fb.group({     // {5}
              id: [this.telefone.id],
              codigoArea: [this.telefone.codigoArea, Validators.required],
              DDD: [this.telefone.DDD, Validators.required],
              numero: [this.telefone.numero, Validators.required]
            });
            console.log(this.formTelefone);
          }, error => {console.error(error); });
        } else {
          this.telefone = {
            id: null,
            codigoArea: null,
            DDD: null,
            numero: ''
          };
          this.formTelefone = this.fb.group({     // {5}
            id: [this.telefone.id],
            codigoArea: [this.telefone.codigoArea, Validators.required],
            DDD: [this.telefone.DDD, Validators.required],
            numero: [this.telefone.numero, Validators.required]
          });
        }
      });
  }

  onSubmit(): void {
    this.telefone = this.formTelefone.value;
    if (this.telefone.id === null){
      this.telefoneService.salvarTelefone(this.telefone).subscribe(() => {
        this.telefoneService.showMessage('Telefone salvo com sucesso', false);
      });
      this.router.navigate(['/telefone']);
    }else{
      this.telefoneService.editarTelefone(this.telefone).subscribe(() => {
        this.telefoneService.showMessage('Telefone salvo com sucesso', false);
      });
      this.router.navigate(['/telefone']);
    }
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return false;
  }

  get getControl(){
    return this.formTelefone.controls;
  }

}
