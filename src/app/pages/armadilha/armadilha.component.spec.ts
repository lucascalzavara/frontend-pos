import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmadilhaComponent } from './armadilha.component';

describe('ArmadilhaComponent', () => {
  let component: ArmadilhaComponent;
  let fixture: ComponentFixture<ArmadilhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmadilhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmadilhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
