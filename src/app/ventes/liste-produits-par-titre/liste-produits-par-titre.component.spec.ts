import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProduitsParTitreComponent } from './liste-produits-par-titre.component';

describe('ListeProduitsParTitreComponent', () => {
  let component: ListeProduitsParTitreComponent;
  let fixture: ComponentFixture<ListeProduitsParTitreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeProduitsParTitreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeProduitsParTitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
