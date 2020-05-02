import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import * as actionsFiltros from 'src/app/filtros/filtros.actions';
import * as actionsTodos from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: actionsFiltros.filtrosValidos;
  filtros     : actionsFiltros.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  pendientes  : number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('filtros').subscribe( filtro => this.filtroActual = filtro );
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.pendientes   = state.todos.filter( todo => !todo.completado ).length;
    });
  }

  cambiarFiltro( filtro: actionsFiltros.filtrosValidos ){
    this.store.dispatch( actionsFiltros.setFiltro({ filtro }));
  }

  limpiarCompletados(){
    this.store.dispatch( actionsTodos.limpiarCompletados() )
  }

}
