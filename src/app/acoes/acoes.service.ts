import { Acao, AcaoAPI, Acoes } from './acoes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpClient: HttpClient) {}

   getAcoes(valor?:string): Observable<Acoes>{

    const params = valor ? new HttpParams().append('valor', valor) : undefined;

     return this.httpClient
     .get<AcaoAPI>('http://localhost:3000/acoes', { params })
     .pipe(
       pluck('payload'),
       map((acoes) => acoes
       .sort((acaoA,acaoB) =>this.ordenaAcoes(acaoA,acaoB))));
   }

   ordenaAcoes(acaoA: Acao, acaoB: Acao): number{

     if(acaoB.codigo > acaoA.codigo) {
       return -1;
      }else if(acaoA.codigo > acaoB.codigo){
        return 1;
      }

      return 0;
   }
}
