import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TicketType } from 'src/app/enums/ticket-type';
import { TicketApiService } from 'src/app/services/ticket-api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  ticketTypes = Object.values(TicketType).filter(value => typeof value === 'string');

  constructor(private service:TicketApiService) { }

  breakpoint: number;
  form: FormGroup = new FormGroup({
    ticketType: new FormControl('', Validators.required),
    customerEmail: new FormControl('', Validators.email),
    customerPhone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    customerNumber: new FormControl('', Validators.max(2147483647)),
    comments: new FormControl('', Validators.required),
    checkedTerms: new FormControl(false)
  });
  
  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 1000) ? 1 : 2;
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    this.form.setValue({
      ticketType: '',
      customerEmail: '',
      customerPhone: '',
      customerNumber: '',
      comments: '',
      checkedTerms: false
    });
  }

  onClear() {
    this.form.reset();
    this.initializeFormGroup();
  }

  onSubmit(){
    if(this.form.valid){
      this.insertTicket(this.form.value)
     }
  }

  insertTicket(ticket) {
    let request : any = {
      Type: TicketType[ticket.ticketType],
      CustomerEmail: ticket.customerEmail,
      CustomerPhone: ticket.customerPhone.toString(),
      CustomerNumber: ticket.customerNumber.toString(),
      Description: ticket.comments
    }

    this.service.addTicket(request).subscribe(
      res => 
      { 
        Swal.fire({
          icon: 'success',
          title: 'Thanks!',
          text: 'Inserted successfully!',
        }) 
      },
      err => 
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.title,
        }) 
      }
    )
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 1000) ? 1 : 2;
  }
}
