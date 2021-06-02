import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CargaDto} from '../../model/carga-dto';
import {EMPTY, Observable, Subscription} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CargaService {

  constructor(
    private httpCarga: HttpClient,
    private snackbar: MatSnackBar
  ) {
  }

  cargas: CargaDto[];

  listarCargas(): Observable<CargaDto[]> {
    const url = `${environment.config.URL_API}/carga/`;
    return this.httpCarga.get<CargaDto[]>(url).pipe(
      map((cargas) => cargas)
    );
  }

  salvarCarga(carga: CargaDto): Observable<CargaDto> {
    const url = `${environment.config.URL_API}/carga/add`;
    return this.httpCarga.post<CargaDto>(url, carga).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  editarCarga(carga: CargaDto): Observable<CargaDto> {
    const url = `${environment.config.URL_API}/carga/edit`;
    return this.httpCarga.put<CargaDto>(url, carga).pipe(
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

  buscarCargasPorId(id: number): Observable<CargaDto> {
    const url = `${environment.config.URL_API}/carga/`;
    return this.httpCarga.get<CargaDto>(url + id).pipe(
      map((carga) => carga),
      catchError((e) => this.errorHandler(e))
    );
  }

  deletarCarga(id: number): void {
    const url = `${environment.config.URL_API}/carga/delete/${id}`;
    this.httpCarga.delete(url).subscribe({
      next: data => {
        this.showMessage('Deletado com sucesso', false);
      },
      error: error => {
        catchError(e => this.errorHandler(e));
      },
    });
  }
}
