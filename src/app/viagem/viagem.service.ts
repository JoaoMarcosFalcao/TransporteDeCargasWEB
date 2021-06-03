import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ViagemDto} from '../../model/viagem-dto';
import {EMPTY, Observable, Subscription} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ViagemService {

  constructor(
    private httpViagem: HttpClient,
    private snackbar: MatSnackBar
  ) {
  }

  viagems: ViagemDto[];

  listarViagens(): Observable<ViagemDto[]> {
    const url = `${environment.config.URL_API}/viagem/`;
    return this.httpViagem.get<ViagemDto[]>(url).pipe(
      map((viagems) => viagems)
    );
  }

  salvarViagem(viagem: ViagemDto): Observable<ViagemDto> {
    const url = `${environment.config.URL_API}/viagem/add`;
    return this.httpViagem.post<ViagemDto>(url, viagem).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  editarViagem(viagem: ViagemDto): Observable<ViagemDto> {
    const url = `${environment.config.URL_API}/viagem/edit`;
    return this.httpViagem.put<ViagemDto>(url, viagem).pipe(
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

  buscarViagensPorId(id: number): Observable<ViagemDto> {
    const url = `${environment.config.URL_API}/viagem/`;
    return this.httpViagem.get<ViagemDto>(url + id).pipe(
      map((viagem) => viagem),
      catchError((e) => this.errorHandler(e))
    );
  }

  deletarViagem(id: number): void {
    const url = `${environment.config.URL_API}/viagem/delete/${id}`;
    this.httpViagem.delete(url).subscribe({
      next: data => {
        this.showMessage('Deletado com sucesso', false);
      },
      error: error => {
        catchError(e => this.errorHandler(e));
      },
    });
  }
}
