import { TestBed } from '@angular/core/testing';

import { ArtistInterceptor } from './artist.interceptor';

describe('ArtistInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ArtistInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ArtistInterceptor = TestBed.inject(ArtistInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
