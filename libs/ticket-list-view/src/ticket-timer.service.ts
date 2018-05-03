import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TicketTimerService {
  private _pastTimerIds: number[] = [];
  private _timer$: Observable<number> = Observable.create(observer => {
    let count = 0;
    const intervalId = window.setInterval(() => {
      this._pastTimerIds = [...this._pastTimerIds, intervalId];
      console.log('id: ', this._pastTimerIds, ' : ', intervalId);
      // this.timerHistory$.next(this._pastTimerIds);
      observer.next(++count);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });
  // todo: make it work
  timerHistory$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(this._pastTimerIds);

  get timer$() {
    return this._timer$;
  }

  constructor() { }

}
