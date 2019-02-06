import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IOService } from '../services/io.service';

@Component({
  selector: 'app-element-component',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})

export class ElementComponent {
  /*Таймаут для правильной обработки переключения фокуса с инпута заголовка на инпут текста*/
  timeout = null;

  /*Текст задачи для сравнения*/
  text = '';

  /*Заголовок задачи для сравнения*/
  title = '';

  /*Объект задачи*/
  @Input() item = {
    id: null,
    title: '',
    text: '',
    completed: false,
    archive: false,
    date: null
  };

  /*Тип данного элемента, может быть add, show, edit*/
  @Input() type = 'show';

  @ViewChild('input') inputElement: ElementRef;

  constructor(private io: IOService) {}

  /*Клик по кнопке "Добавить задачу" - добавляем элемент и обнуляем поля ввода заголовка и текста*/
  onAddClick() {
    this.io.addItem(this.item.title, this.item.text);
    this.item.title = '';
    this.item.text = '';
  }

  /*Клик по кнопке "Выполнено" - сохраняет задачу*/
  onCompleteClick() {
    this.item.completed = !this.item.completed;
    this.io.setItem(this.item);
  }

  /*Клик по кнопке "Архив" - сохраняет задачу*/
  onArchiveClick() {
    this.item.archive = !this.item.archive;
    this.io.setItem(this.item);
  }

  /*Клик по кнопке "Удалить" - удаляет задачу*/
  onRemoveClick() {
    this.io.removeItem(this.item.id);
  }

  /*Клик по кнопке "Редактировать" - открывает задачу для редактирования и запоминает старые значения полей*/
  onEditClick() {
    this.title = this.item.title;
    this.text = this.item.text;
    this.type = 'edit';
    setTimeout( () => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  /*При переходе фокуса сохраняет задачу, если только не перешли с поля заголовка на поле текста*/
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

  /*Фокус на поле текста задачи отменяет сохранение*/
  onFocus() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  /*Отслеживает нажатие клавиши Enter, по которой сохраняем задачу*/
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
