import { Component, OnInit } from '@angular/core';
import {EnderecoService} from '../endereco.service';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {EnderecoDto} from '../../../model/endereco-dto';
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
  selector: 'app-endereco-detalhe',
  templateUrl: './endereco-detalhe.component.html',
  styleUrls: ['./endereco-detalhe.component.css'],
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
export class EnderecoDetalheComponent implements OnInit {

  constructor(private enderecoService: EnderecoService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  endereco: EnderecoDto;

  formEndereco: FormGroup;

  matcher = new MyErrorStateMatcher();

  inscricao: Subscription;

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: Params) => {
        const id: number = +params.id;
        if (id) {
          this.enderecoService.buscarEnderecosPorId(id).subscribe(dados => {
            this.endereco = dados;
            this.formEndereco = this.fb.group({     // {5}
              id: [this.endereco.id],
              rua: [this.endereco.rua, [Validators.required, Validators.required]],
              numero: [this.endereco.numero, Validators.required],
              complemento: [this.endereco.complemento, Validators.required],
              bairro: [this.endereco.bairro, Validators.required],
              cidade: [this.endereco.cidade, [ Validators.required ]],
              estado: [this.endereco.estado]
            });
            console.log(this.formEndereco);
          }, error => {console.error(error); });
        } else {
          this.endereco = {
            id: null,
            rua: '',
            complemento: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: ''
          };
          this.formEndereco = this.fb.group({     // {5}
            id: [this.endereco.id],
            rua: [this.endereco.rua, [Validators.required, Validators.required]],
            complemento: [this.endereco.complemento, Validators.required],
            numero: [this.endereco.numero, Validators.required],
            bairro: [this.endereco.bairro, Validators.required],
            cidade: [this.endereco.cidade, [ Validators.required ]],
            estado: [this.endereco.estado]
          });
        }
      });
  }

  onSubmit(): void {
    this.endereco = this.formEndereco.value;
    if (this.endereco.id === null){
      this.enderecoService.salvarEndereco(this.endereco).subscribe(() => {
        this.enderecoService.showMessage('Endereco Salvo com sucesso', false);
      });
      this.router.navigate(['/endereco']);
    }else{
      this.enderecoService.editarEndereco(this.endereco).subscribe(() => {
        this.enderecoService.showMessage('Endereco Salvo com sucesso', false);
      });
      this.router.navigate(['/endereco']);
    }
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return false;
  }

  get getControl(){
    return this.formEndereco.controls;
  }

}
