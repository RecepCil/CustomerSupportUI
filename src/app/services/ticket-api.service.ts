import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketApiService {

  readonly ticketAPIUrl = "https://localhost:7263/api";

  constructor(private http:HttpClient) { }

  getTicketList():Observable<any[]> {
    return this.http.get<any>(this.ticketAPIUrl + '/Tickets');
  }
  
  addTicket(data:any) {
    return this.http.post(this.ticketAPIUrl + '/Tickets', data);
  }

  updateTicket(id:number|string, data:any) {
    return this.http.put(this.ticketAPIUrl + `/tickets/${id}`, data);
  }

  deleteTicket(id:number|string) {
    return this.http.delete(this.ticketAPIUrl + `/tickets/${id}`);
  }

}
