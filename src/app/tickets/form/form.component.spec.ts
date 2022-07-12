import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { By } from '@angular/platform-browser';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: 
      [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onClear() should clear the form', () => {
    component.onClear();
    expect(component.form.value.ticketType).toBe('');
    expect(component.form.value.customerEmail).toBe('');
    expect(component.form.value.customerPhone).toBe('');
    expect(component.form.value.customerNumber).toBe('');
    expect(component.form.value.comments).toBe('');
    expect(component.form.value.checkedTerms).toBe(false);
  });

  it('onSubmit() should not have been called unless data is valid', () => {
    spyOn(component, 'onSubmit');
    let button = fixture.debugElement.nativeElement.querySelector('#submitButton')
    button.click();
    expect(component.onSubmit).not.toHaveBeenCalled();
  });

  it('all inputs should be truthy', async () => {
    const el = fixture.debugElement.nativeElement;
    let customerEmail= el.querySelector('input[formControlName=customerEmail]');
    let customerPhone= el.querySelector('input[formControlName=customerPhone]');
    let customerNumber= el.querySelector('input[formControlName=customerNumber]');
    let comments = document.getElementById('comments') as HTMLInputElement | null;
    let checkedTerms = document.getElementById('checkedTerms') as HTMLInputElement | null;

    expect(customerEmail).toBeTruthy();
    expect(customerPhone).toBeTruthy();
    expect(customerNumber).toBeTruthy();
    expect(comments).toBeTruthy();
    expect(checkedTerms).toBeTruthy();
  })
  
  it('onSubmit() should have been called if data is valid', async () => {
    const el = fixture.debugElement.nativeElement;
    const customerEmail= el.querySelector('input[formControlName=customerEmail]');
    const customerPhone= el.querySelector('input[formControlName=customerPhone]');
    const comments = document.getElementById('comments') as HTMLInputElement | null;
    const checkbox = fixture.nativeElement.querySelector('.mat-checkbox-input');

    // set customer email
    customerEmail.value = 'r.cilrecep@gmail.com';
    customerEmail.dispatchEvent(new Event('input'));

    // set customer phone
    customerPhone.value = '5376504522';
    customerPhone.dispatchEvent(new Event('input'));

    // set comments
    comments.value = 'Please help me!';
    comments.dispatchEvent(new Event('input'));

    // check terms & conditions
    checkbox.click();

    // select ticket type
    const de = fixture.debugElement;
    const matSelect = de.query(By.css('.mat-select-trigger')).nativeElement;
    matSelect.click();
    fixture.detectChanges();
    const matOption = de.query(By.css('.mat-option')).nativeElement;
    matOption.click();
    fixture.detectChanges();

    // click submit button
    spyOn(component, 'onSubmit');
    let button = document.getElementById('submitButton')
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  })
});
