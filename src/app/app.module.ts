import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatListModule, MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule} from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    BrowserModule,
    FormsModule
  ],
  providers: [IOService],
  bootstrap: [AppComponent]
})
export class AppModule { }
