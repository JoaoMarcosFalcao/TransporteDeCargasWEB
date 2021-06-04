import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RotaDto} from '../../model/rota-dto';
import {EMPTY, Observable, Subscription} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RotaService {

  constructor(
    private httpRota: HttpClient,
    private snackbar: MatSnackBar
  ) {
  }

  rotas: RotaDto[];

  listarRotas(): Observable<RotaDto[]> {
    const url = `${environment.config.URL_API}/rota/`;
    return this.httpRota.get<RotaDto[]>(url).pipe(
      map((rotas) => rotas)
    );
  }

  salvarRota(rota: RotaDto): Observable<RotaDto> {
    const url = `${environment.config.URL_API}/rota/add`;
    return this.httpRota.post<RotaDto>(url, rota).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  editarRota(rota: RotaDto): Observable<RotaDto> {
    const url = `${environment.config.URL_API}/rota/edit`;
    return this.httpRota.put<RotaDto>(url, rota).pipe(
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

  buscarRotasPorId(id: number): Observable<RotaDto> {
    const url = `${environment.config.URL_API}/rota/`;
    return this.httpRota.get<RotaDto>(url + id).pipe(
      map((rota) => rota),
      catchError((e) => this.errorHandler(e))
    );
  }

  deletarRota(id: number): void {
    const url = `${environment.config.URL_API}/rota/delete/${id}`;
    this.httpRota.delete(url).subscribe({
      next: data => {
        this.showMessage('Deletado com sucesso', false);
      },
      error: error => {
        catchError(e => this.errorHandler(e));
      },
    });
  }
}
