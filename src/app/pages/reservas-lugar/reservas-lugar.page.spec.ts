import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservasLugarPage } from './reservas-lugar.page';

describe('ReservasLugarPage', () => {
  let component: ReservasLugarPage;
  let fixture: ComponentFixture<ReservasLugarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasLugarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
