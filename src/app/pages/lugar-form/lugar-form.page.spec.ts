import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LugarFormPage } from './lugar-form.page';

describe('LugarFormPage', () => {
  let component: LugarFormPage;
  let fixture: ComponentFixture<LugarFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LugarFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
