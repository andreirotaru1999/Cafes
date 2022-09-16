import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLocalitatiComponent } from './lista-localitati.component';

describe('ListaLocalitatiComponent', () => {
  let component: ListaLocalitatiComponent;
  let fixture: ComponentFixture<ListaLocalitatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaLocalitatiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaLocalitatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
