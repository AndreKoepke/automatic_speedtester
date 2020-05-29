import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBaseValuesComponent } from './print-base-values.component';

describe('PrintBaseValuesComponent', () => {
  let component: PrintBaseValuesComponent;
  let fixture: ComponentFixture<PrintBaseValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintBaseValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintBaseValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
