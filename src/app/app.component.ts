import { Component, OnInit } from '@angular/core';
import { IOService } from './services/io.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  filterValue = 'all';
  sortValue = 'text_asc';
  filterOptions = [
    {
    value: 'all',
    label: 'Все'
  }, {
    label: 'В работе',
    value: 'work'
  }, {
    label: 'Завершенные',
    value: 'completed'
  }, {
    label: 'Архив',
    value: 'archive'
  }, {
    label: 'Сегодня',
    value: 'today'
  }, {
    label: 'Последняя неделя',
    value: 'week'
  }];
  sortOptions = [
    {
    value: 'id_desc',
    label: 'По дате, сначала новые'
  }, {
    value: 'id_asc',
    label: 'По дате, сначала старые'
  }, {
    value: 'text_asc',
    label: 'По алфавиту'
  }];
  originalItems = [];
  items = [];

  constructor(private io: IOService) {
    io.refreshItems$.subscribe( () => this.getItems());
  }

  ngOnInit() {
    this.filterValue = 'all';
    this.sortValue = 'text_asc';
    this.getItems();
  }

  getItems() {
    this.originalItems = this.io.getAll();
    this.onSelectFilter();
    this.onSelectSort();
  }

  onSelectFilter() {
    const type = this.filterValue;

    this.items = this.originalItems.filter( item => {
      if (type === 'all') {
        return true;
      } else if (type === 'completed' || type === 'archive') {
        return item[type];
      } else if (type === 'work') {
        return (!item.completed && !item.archive);
      } else if (type === 'today') {
        const today = moment().format('YYYYMMDD');
        return item.date === today;
      } else if (type === 'week') {
        const lastWeek = moment().add(-7, 'days').format('YYYYMMDD');
        return lastWeek < item.date;
      }
    });
  }

  onSelectSort() {
    const type = this.sortValue.substr(0, this.sortValue.indexOf('_'));
    const direction = this.sortValue.substr(this.sortValue.indexOf('_') + 1) || 'asc';

    this.items.sort((itemA, itemB) => {
      const a = itemA[type].toLowerCase();
      const b = itemB[type].toLowerCase();

      if (((a > b) && direction === 'asc') || ((a < b) && direction === 'desc')) {
        return 1;
      } else if (((a < b) && direction === 'asc') || ((a > b) && direction === 'desc')) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}
