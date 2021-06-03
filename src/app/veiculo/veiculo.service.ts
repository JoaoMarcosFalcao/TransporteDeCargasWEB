import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VeiculoDto} from '../../model/veiculo-dto';
import {EMPTY, Observable, Subscription} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  constructor(
    private httpVeiculo: HttpClient,
    private snackbar: MatSnackBar
  ) {
  }

  veiculos: VeiculoDto[];

  listarVeiculos(): Observable<VeiculoDto[]> {
    const url = `${environment.config.URL_API}/veiculo/`;
    return this.httpVeiculo.get<VeiculoDto[]>(url).pipe(
      map((veiculos) => veiculos)
    );
  }

  salvarVeiculo(veiculo: VeiculoDto): Observable<VeiculoDto> {
    const url = `${environment.config.URL_API}/veiculo/add`;
    return this.httpVeiculo.post<VeiculoDto>(url, veiculo).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  editarVeiculo(veiculo: VeiculoDto): Observable<VeiculoDto> {
    const url = `${environment.config.URL_API}/veiculo/edit`;
    return this.httpVeiculo.put<VeiculoDto>(url, veiculo).pipe(
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

  buscarVeiculosPorId(id: number): Observable<VeiculoDto> {
    const url = `${environment.config.URL_API}/veiculo/`;
    return this.httpVeiculo.get<VeiculoDto>(url + id).pipe(
      map((veiculo) => veiculo),
      catchError((e) => this.errorHandler(e))
    );
  }

  deletarVeiculo(id: number): void {
    const url = `${environment.config.URL_API}/veiculo/delete/${id}`;
    this.httpVeiculo.delete(url).subscribe({
      next: data => {
        this.showMessage('Deletado com sucesso', false);
      },
      error: error => {
        catchError(e => this.errorHandler(e));
      },
    });
  }
}
