import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminMessageService {

  messages: String[] = [];
  subject = new Subject<String[]>();

  constructor() { }

  add(message: string): void{
    this.clear();
    this.messages.push(message);
    this.subject.next(this.messages);
  }

  clear(){
    this.messages = [];
  }

  addSpringErrors(err: any){
    this.clear();
    err?.errors?.forEach((mess: any) => {
    this.messages.push(` Pole ${mess?.field} -> ${mess?.defaultMessage}`)
    })
    
    this.subject.next(this.messages);
  }
}
