import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateApartmentComponent} from './update-apartment.component';

describe('UpdateApartmentComponent', () => {
  let component: UpdateApartmentComponent;
  let fixture: ComponentFixture<UpdateApartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateApartmentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
