import { Component, OnInit } from '@angular/core';
import {MotoristaService} from '../motorista.service';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {MotoristaDto} from '../../../model/motorista-dto';
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
  selector: 'app-motorista-detalhe',
  templateUrl: './motorista-detalhe.component.html',
  styleUrls: ['./motorista-detalhe.component.css'],
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
export class MotoristaDetalheComponent implements OnInit, ErrorStateMatcher {

  constructor(private motoristaService: MotoristaService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  motorista: MotoristaDto;

  formMotorista: FormGroup;

  matcher = new MyErrorStateMatcher();

  inscricao: Subscription;

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: Params) => {
        const id: number = +params.id;
        if (id) {
          this.motoristaService.buscarMotoristasPorId(id).subscribe(dados => {
            this.motorista = dados;
            this.formMotorista = this.fb.group({     // {5}
              id: [this.motorista.id],
              nome: [this.motorista.nome, Validators.required],
              email: [this.motorista.email, Validators.required],
              endereco: [this.motorista.endereco],
              cnh: [this.motorista.cnh, Validators.required],
              validadecnh: [this.motorista.validadecnh, Validators.required]
            });
            console.log(this.formMotorista);
          }, error => {console.error(error); });
        } else {
          this.motorista = {
            id: null,
            nome: '',
            email: '',
            endereco: null,
            cnh: '',
            validadecnh: null,
          };
          this.formMotorista = this.fb.group({     // {5}
            id: [this.motorista.id],
            nome: [this.motorista.nome, Validators.required],
            email: [this.motorista.email, Validators.required],
            endereco: [this.motorista.endereco],
            cnh: [this.motorista.cnh, Validators.required],
            validadecnh: [this.motorista.validadecnh, Validators.required]
          });
        }
      });
  }
  onSubmit(): void {
    this.motorista = this.formMotorista.value;
    if (this.motorista.id === null){
      this.motoristaService.salvarMotorista(this.motorista).subscribe(() => {
        this.motoristaService.showMessage('Motorista Salvo com sucesso', false);
      });
      this.router.navigate(['/motorista']);
    }else{
      this.motoristaService.editarMotorista(this.motorista).subscribe(() => {
        this.motoristaService.showMessage('Motorista Salvo com sucesso', false);
      });
      this.router.navigate(['/motorista']);
    }
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return false;
  }

  get getControl(){
    return this.formMotorista.controls;
  }

}
