import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProduitsParNatureComponent } from './liste-produits-par-nature.component';

describe('ListeProduitsParNatureComponent', () => {
  let component: ListeProduitsParNatureComponent;
  let fixture: ComponentFixture<ListeProduitsParNatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeProduitsParNatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeProduitsParNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
