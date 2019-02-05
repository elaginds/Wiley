import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class IOService {
  private lsName = 'db';

  public refreshItemsSource = new Subject<any>();
  refreshItems$ = this.refreshItemsSource.asObservable();

  public getAll() {
    const db = localStorage.getItem(this.lsName);

    if (db && typeof db === 'string') {
      return JSON.parse(db);
    } else {
      return [];
    }
  }

  public addItem(text) {
    const db = this.getAll();
    db.push({
      id: moment().format('x'),
      text: text,
      completed: false,
      archive: false,
      date: moment().format('YYYYMMDD')
    });

    this.setAll(db);
  }

  public setItem(item) {
    if (item && item.id) {
      const db = this.getAll();
      db.forEach( dbItem => {
        if (dbItem.id === item.id) {
          dbItem.text = item.text;
          dbItem.completed = item.completed;
          dbItem.archive = item.archive;
        }
      });

      this.setAll(db);
    }
  }

  public removeItem(id) {
    if (id) {
      let index = null;

      const db = this.getAll();
      db.forEach( (dbItem, dbKey) => {
        if (dbItem.id === id) {
          index = dbKey;
        }
      });

      if (index !== null) {
        db.splice(index, 1);
        this.setAll(db);
      }
    }
  }

  private setAll(db) {
    localStorage.setItem(this.lsName, JSON.stringify(db));
    this.refreshItemsSource.next();
  }
}
