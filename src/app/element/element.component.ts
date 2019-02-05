import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IOService } from '../services/io.service';
import * as moment from 'moment';

@Component({
  selector: 'app-element-component',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent {
  text = '';

  @Input() item = {
    id: null,
    text: '',
    completed: false,
    archive: false,
    date: null
  };

  @Input() type = 'show';

  @ViewChild('input') inputElement: ElementRef;

  constructor(private io: IOService) {

  }

  onAddClick() {
    this.io.addItem(this.item.text);
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
    this.text = this.item.text;
    this.type = 'edit';
    setTimeout( () => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  onBlur() {
    if (this.text !== this.item.text) {
      this.io.setItem(this.item);
    }

    this.type = 'show';
  }
}
