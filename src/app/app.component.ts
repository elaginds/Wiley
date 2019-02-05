import { Component, OnInit } from '@angular/core';
import { IOService } from './services/io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  selectOptions = [{
    value: 'id_desc',
    label: 'По дате, сначала новые'
  }, {
    value: 'id_asc',
    label: 'По дате, сначала старые'
  }, {
    value: 'text_asc',
    label: 'По алфавиту'
  }];
  items = [];

  constructor(private io: IOService) {
    io.refreshItems$.subscribe( () => this.getItems());
  }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.items = this.io.getAll();
  }

  onSelectSort(value) {
    const type = value.substr(0, value.indexOf('_'));
    const direction = value.substr(value.indexOf('_') + 1) || 'asc';

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
