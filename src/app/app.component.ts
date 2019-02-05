import { Component, OnInit } from '@angular/core';
import { IOService } from './services/io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
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
}
