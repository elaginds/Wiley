import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { ElementComponent } from './element/element.component';

import { IOService } from './services/io.service';

@NgModule({
  declarations: [
    AppComponent,
    ElementComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    FormsModule
  ],
  providers: [IOService],
  bootstrap: [AppComponent]
})
export class AppModule { }
