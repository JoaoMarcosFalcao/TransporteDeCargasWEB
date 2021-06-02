import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnderecoDto} from '../../model/endereco-dto';
import {EMPTY, Observable, Subscription} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(
    private httpEndereco: HttpClient,
    private snackbar: MatSnackBar
  ) {

  }

  enderecos: EnderecoDto[];

  listarEnderecos(): Observable<EnderecoDto[]> {
    const url = `${environment.config.URL_API}/endereco/` ;
    return this.httpEndereco.get<EnderecoDto[]>(url).pipe(
      map((enderecos) => enderecos)
    );
  }
  salvarEndereco(endereco: EnderecoDto): Observable<EnderecoDto>{
    const url = `${environment.config.URL_API}/endereco/add` ;
    return this.httpEndereco.post<EnderecoDto>(url, endereco).pipe(
      map(obj => obj),
      catchError( (e) => this.errorHandler(e))
    );
  }

  editarEndereco(endereco: EnderecoDto): Observable<EnderecoDto>{
    const url = `${environment.config.URL_API}/endereco/edit` ;
    return this.httpEndereco.put<EnderecoDto>(url, endereco).pipe(
      map(obj => obj),
      catchError( (e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any>{
    this.showMessage('Ocorreu um erro!', true );
    return EMPTY;
  }

  showMessage(msg: string, isError: boolean = false): void{
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  buscarEnderecosPorId(id: number): Observable<EnderecoDto> {
    const url = `${environment.config.URL_API}/endereco/`;
    return this.httpEndereco.get<EnderecoDto>(url + id).pipe(
      map((endereco) => endereco),
      catchError((e) => this.errorHandler(e))
    );
  }

  deletarEndereco(id: number): void {
    const url = `${environment.config.URL_API}/endereco/delete/${id}`;
    this.httpEndereco.delete(url).subscribe({
      next: data => {
        this.showMessage('Deletado com sucesso', false);
      },
      error: error => {
        catchError(e => this.errorHandler(e));
      },
    });
  }
}
