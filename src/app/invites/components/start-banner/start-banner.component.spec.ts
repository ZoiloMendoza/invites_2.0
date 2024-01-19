import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartBannerComponent } from './start-banner.component';

describe('StartBannerComponent', () => {
  let component: StartBannerComponent;
  let fixture: ComponentFixture<StartBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
