import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TicketsComponent } from './tickets/tickets.component';
import { FormComponent } from './tickets/form/form.component';
import { MaterialModule } from './material/material.module';
import { TicketApiService } from './services/ticket-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [TicketApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
