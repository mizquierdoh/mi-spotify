import { TestBed } from '@angular/core/testing';

import { MusicStoryService } from './music-story.service';

describe('MusicStoryService', () => {
  let service: MusicStoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
