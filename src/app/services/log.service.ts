import { Injectable, OnInit } from '@angular/core';

import { BehaviorSubject, Observable, of, observable } from 'rxjs';


import { Log } from '../modules/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[];

  private logSource = new BehaviorSubject<Log>({
    id: null, text: null, date: null
  });

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  selectedLog: Observable<Log> = this.logSource.asObservable();
  constructor() {
    this.logs = [];
  }

  clearState() {
    this.stateSource.next(true);
  }
  addLog(log: Log) {
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((item, index) => {
      if (log.id === item.id)
        this.logs.splice(index, 1);
    });
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(id: string) {
    this.logs.forEach((item, index) => {
      if (id === item.id)
        this.logs.splice(index, 1);
    });
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  setLogForm(log: Log) {
    this.logSource.next(log);
  }
  getLogs(): Observable<Log[]> {
    const items = localStorage.getItem('logs');
    if (items === null) {
      this.logs = [];
    }
    else {
      this.logs = JSON.parse(items);
    }
    return of(this.logs.sort((a, b) => b.date - a.date));
  }
}
