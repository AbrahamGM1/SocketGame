import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickgameComponent } from './clickgame.component';

describe('ClickgameComponent', () => {
  let component: ClickgameComponent;
  let fixture: ComponentFixture<ClickgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClickgameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClickgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
