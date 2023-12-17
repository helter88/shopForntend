import { TestBed } from '@angular/core/testing';

import { AdminConfirmationDialogService } from './admin-confirmation-dialog.service';

describe('AdminConfirmationDialogService', () => {
  let service: AdminConfirmationDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminConfirmationDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
