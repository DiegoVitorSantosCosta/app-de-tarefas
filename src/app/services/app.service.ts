import { Injectable } from '@angular/core/';
import { EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  static event: EventEmitter<any> = new EventEmitter();
  static eventDone: EventEmitter<any> = new EventEmitter();
  static paraAtualizarOdone: EventEmitter<boolean> = new EventEmitter();
  public bool: boolean = false
  public done: number = 0;

  public doneBoll: boolean = false;

  constructor(
   
  ) { }

  getIten() {
    return this.bool 
  }

  addIten(data: number){
    this.done = data
    AppService.eventDone.emit(this.done);
  }

  
  getDone(){
    return this.done
  }

  addData(data: boolean){
    
    this.bool = data;
    AppService.event.emit(data);
  }


  adcionarNOconcluido(event: boolean){
    this.doneBoll = event;
    AppService.paraAtualizarOdone.emit(event);

  }

  getConcluido(){
    return this.doneBoll
  }

}
