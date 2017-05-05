import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingStatusService {
  _isLoading=new BehaviorSubject<boolean>(false);
  isLoading$:Observable<boolean>;

  startLoading(){
    this._isLoading.next(true);
  }

  stopLoading(){
    this._isLoading.next(false);
  }

  constructor() {
    this.isLoading$=this._isLoading.asObservable();
  }

}
