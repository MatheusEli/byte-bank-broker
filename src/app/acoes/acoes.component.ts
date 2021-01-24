import { AcoesService } from './acoes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent{

  acoesInput = new FormControl();

  todasAcoes$ = this.acoesService.getAcoes().pipe(tap(()=>console.log('Fluxo Inicial')));

  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
  filter((valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length),
  switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado)),
  tap(()=>console.log('Fluxo do Filtro')));

  acoes$ = merge(this.todasAcoes$, this.filtroPeloInput$);

  constructor(private acoesService: AcoesService) {}
}
