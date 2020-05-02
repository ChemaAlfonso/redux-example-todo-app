import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('inputFisico') inputFisico: ElementRef;

  chkCompletado: FormControl;
  textInput    : FormControl;

  editing: boolean;

  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.chkCompletado = new FormControl( this.todo.completado );
    this.textInput     = new FormControl( this.todo.texto, Validators.required );

    this.chkCompletado.valueChanges.subscribe( valor => {
      this.store.dispatch( actions.toggle({ id: this.todo.id }) );
    });
  }

  edit() {
    this.editing = true;
    this.textInput.setValue( this.todo.texto );

    setTimeout(() => {
      this.inputFisico.nativeElement.select();
    }, 1);
  }

  endEdit() {
    this.editing = false;

    if( this.textInput.invalid ) return;
    if( this.textInput.value === this.todo.texto ) return;

    this.store.dispatch( actions.edit( {id: this.todo.id, text: this.inputFisico.nativeElement.value }));
  }

  remove() {
    this.store.dispatch(actions.remove({ id: this.todo.id }));
  }
}
