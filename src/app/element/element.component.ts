import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IOService } from '../services/io.service';
import * as moment from 'moment';

@Component({
  selector: 'app-element-component',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent {
  timeout = null;
  text = '';
  title = '';

  @Input() item = {
    id: null,
    title: '',
    text: '',
    completed: false,
    archive: false,
    date: null
  };

  @Input() type = 'show';

  @ViewChild('input') inputElement: ElementRef;

  constructor(private io: IOService) {}

  onAddClick() {
    this.io.addItem(this.item.title, this.item.text);
    this.item.title = '';
    this.item.text = '';
  }

  onCompleteClick() {
    this.item.completed = !this.item.completed;
    this.io.setItem(this.item);
  }

  onArchiveClick() {
    this.item.archive = !this.item.archive;
    this.io.setItem(this.item);
  }

  onRemoveClick() {
    this.io.removeItem(this.item.id);
  }

  onEditClick() {
    this.title = this.item.title;
    this.text = this.item.text;
    this.type = 'edit';
    setTimeout( () => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  onBlur() {
    if (this.type === 'add') {
      return true;
    }

    this.timeout = setTimeout( () => {
      if (this.title !== this.item.title || this.text !== this.item.text) {
        this.io.setItem(this.item);
      }

      this.type = 'show';
    }, 100);
  }

  onFocus() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  onKeyPress($event) {
    if ($event.charCode === 13 && this.item.title && this.item.text) {
      if (this.type === 'add') {
        this.onAddClick();
      } else {
        this.onBlur();
      }
    }
  }
}
