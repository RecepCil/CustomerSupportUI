import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TicketsComponent } from './tickets/tickets.component';
import { FormComponent } from './tickets/form/form.component';
import { MaterialModule } from './material/material.module';
import { TicketApiService } from './services/ticket-api.service';

@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule
  ],
  providers: [TicketApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
