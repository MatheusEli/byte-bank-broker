import { Acao, Acoes } from './acoes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpClient: HttpClient) {}

   getAcoes(): Observable<Acao[]>{
     return this.httpClient.get<Acao[]>('localhost:4200/acoes');
   }
}
