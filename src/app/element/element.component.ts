import { Component, Input } from '@angular/core';
import { IOService } from '../services/io.service';

@Component({
  selector: 'app-element-component',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent {
  @Input() value = '';

  @Input() type = 'show';

  constructor(private io: IOService) {

  }

  onAddClick() {
    this.io.addItem(this.value);
    this.value = '';
  }

  onCompleteClick() {
    console.log('complete');
  }

  onArchiveClick() {
    console.log('onArchiveClick');
  }

  onRemoveClick() {
    console.log('onRemoveClick');
  }
}
