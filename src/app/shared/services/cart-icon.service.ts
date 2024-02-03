import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartIconService {
  subject: Subject<number | null> = new Subject();

  constructor() { }

  cartChanged(counter: number | null){
    this.subject.next(counter);
  }
}
