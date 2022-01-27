import { TestBed } from '@angular/core/testing';

import { GroupchatService } from './groupchat.service';

describe('GroupchatService', () => {
  let service: GroupchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
