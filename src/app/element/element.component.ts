import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-element-component',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent {

  @Input() value = 'value';

  @Input() type = 'show';

  onAddClick() {
    console.log('onAddClick');
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
