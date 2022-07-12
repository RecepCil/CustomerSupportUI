import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { TicketApiService } from './ticket-api.service';

describe('TicketApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TicketApiService]
    });
  });

  it('should be created', inject([TicketApiService], (service: TicketApiService) => {
    expect(service).toBeTruthy();
  }));
});
