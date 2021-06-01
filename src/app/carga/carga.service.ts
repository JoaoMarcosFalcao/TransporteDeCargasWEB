import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CargaDto} from '../../model/Carga-dto';
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
  ) { }

  Cargas: CargaDto[];

  listarCargas(): Observable<CargaDto[]> {
    const url = `${environment.config.URL_API}/Carga/` ;
    return this.httpCarga.get<CargaDto[]>(url).pipe(
      map((Cargas) => Cargas)
    );
  }
  salvarCarga(Carga: CargaDto): Observable<CargaDto>{
    const url = `${environment.config.URL_API}/Carga/add` ;
    return this.httpCarga.post<CargaDto>(url, Carga).pipe(
      map(obj => obj),
      catchError( (e) => this.errorHandler(e))
    );
  }

  editarCarga(Carga: CargaDto): Observable<CargaDto>{
    const url = `${environment.config.URL_API}/Carga/edit` ;
    return this.httpCarga.put<CargaDto>(url, Carga).pipe(
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

  bucarCargasPorId(id: number): Observable<CargaDto> {
    const url = `${environment.config.URL_API}/Carga/` ;
    return this.httpCarga.get<CargaDto>(url + id).pipe(
      map((Carga) => Carga),
      catchError( (e) => this.errorHandler(e))
    );
  }

  deletarCarga(id: number): void {
    const url = `${environment.config.URL_API}/Carga/delete/` ;
    this.httpCarga.delete<CargaDto>(url + id).pipe(
      map((Carga) => Carga),
      catchError( (e) => this.errorHandler(e))
    );
  }
}
