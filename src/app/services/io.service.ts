/*Сервис для работой с базой данных
* В данном случае с localStorage*/

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class IOService {
  /*Название элемента в localStorage, в котором сохраняются задачи*/
  private lsName = 'db';

  /*Событие изменения задач*/
  public refreshItemsSource = new Subject<any>();
  refreshItems$ = this.refreshItemsSource.asObservable();

  /*Получить все задачи*/
  public getAll() {
    const db = localStorage.getItem(this.lsName);

    if (db && typeof db === 'string') {
      return JSON.parse(db);
    } else {
      return [];
    }
  }

  /*Добавить новую задачу*/
  public addItem(title, text) {
    const db = this.getAll();
    db.push({
      id: moment().format('x'),
      title: title,
      text: text,
      completed: false,
      archive: false,
      date: moment().format('YYYYMMDD')
    });

    this.setAll(db);
  }

  /*Изменить задачу*/
  public setItem(item) {
    if (item && item.id) {
      const db = this.getAll();
      db.forEach( dbItem => {
        if (dbItem.id === item.id) {
          dbItem.title = item.title;
          dbItem.text = item.text;
          dbItem.completed = item.completed;
          dbItem.archive = item.archive;
        }
      });

      this.setAll(db);
    }
  }

  /*Удалить задачу*/
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

  /*Сохранить все задачи*/
  private setAll(db) {
    localStorage.setItem(this.lsName, JSON.stringify(db));
    this.refreshItemsSource.next();
  }
}
