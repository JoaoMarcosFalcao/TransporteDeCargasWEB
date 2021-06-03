import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MotoristaDto} from '../../model/motorista-dto';
import {EMPTY, Observable, Subscription} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  constructor(
    private httpMotorista: HttpClient,
    private snackbar: MatSnackBar
  ) {

  }

  motoristas: MotoristaDto[];

  listarMotoristas(): Observable<MotoristaDto[]> {
    const url = `${environment.config.URL_API}/motorista/` ;
    return this.httpMotorista.get<MotoristaDto[]>(url).pipe(
      map((motoristas) => motoristas)
    );
  }
  salvarMotorista(motorista: MotoristaDto): Observable<MotoristaDto>{
    const url = `${environment.config.URL_API}/motorista/add` ;
    return this.httpMotorista.post<MotoristaDto>(url, motorista).pipe(
      map(obj => obj),
      catchError( (e) => this.errorHandler(e))
    );
  }

  editarMotorista(motorista: MotoristaDto): Observable<MotoristaDto>{
    const url = `${environment.config.URL_API}/motorista/edit` ;
    return this.httpMotorista.put<MotoristaDto>(url, motorista).pipe(
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

  buscarMotoristasPorId(id: number): Observable<MotoristaDto> {
    const url = `${environment.config.URL_API}/motorista/`;
    return this.httpMotorista.get<MotoristaDto>(url + id).pipe(
      map((motorista) => motorista),
      catchError((e) => this.errorHandler(e))
    );
  }

  deletarMotorista(id: number): void {
    const url = `${environment.config.URL_API}/motorista/delete/${id}`;
    this.httpMotorista.delete(url).subscribe({
      next: data => {
        this.showMessage('Deletado com sucesso', false);
      },
      error: error => {
        catchError(e => this.errorHandler(e));
      },
    });
  }
}
