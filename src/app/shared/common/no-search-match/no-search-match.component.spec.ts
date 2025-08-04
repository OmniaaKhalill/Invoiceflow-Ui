import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSearchMatchComponent } from './no-search-match.component';

describe('NoSearchMatchComponent', () => {
  let component: NoSearchMatchComponent;
  let fixture: ComponentFixture<NoSearchMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoSearchMatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoSearchMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
