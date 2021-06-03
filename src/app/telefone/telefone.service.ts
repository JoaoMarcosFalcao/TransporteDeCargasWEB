import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TelefoneDto} from '../../model/telefone-dto';
import {EMPTY, Observable, Subscription} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TelefoneService {

  constructor(
    private httpTelefone: HttpClient,
    private snackbar: MatSnackBar
  ) {
  }

  telefones: TelefoneDto[];

  listarTelefones(): Observable<TelefoneDto[]> {
    const url = `${environment.config.URL_API}/telefone/`;
    return this.httpTelefone.get<TelefoneDto[]>(url).pipe(
      map((telefones) => telefones)
    );
  }

  salvarTelefone(telefone: TelefoneDto): Observable<TelefoneDto> {
    const url = `${environment.config.URL_API}/telefone/add`;
    return this.httpTelefone.post<TelefoneDto>(url, telefone).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  editarTelefone(telefone: TelefoneDto): Observable<TelefoneDto> {
    const url = `${environment.config.URL_API}/telefone/edit`;
    return this.httpTelefone.put<TelefoneDto>(url, telefone).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackbar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  buscarTelefonesPorId(id: number): Observable<TelefoneDto> {
    const url = `${environment.config.URL_API}/telefone/`;
    return this.httpTelefone.get<TelefoneDto>(url + id).pipe(
      map((telefone) => telefone),
      catchError((e) => this.errorHandler(e))
    );
  }

  deletarTelefone(id: number): void {
    const url = `${environment.config.URL_API}/telefone/delete/${id}`;
    this.httpTelefone.delete(url).subscribe({
      next: data => {
        this.showMessage('Deletado com sucesso', false);
      },
      error: error => {
        catchError(e => this.errorHandler(e));
      },
    });
  }
}
