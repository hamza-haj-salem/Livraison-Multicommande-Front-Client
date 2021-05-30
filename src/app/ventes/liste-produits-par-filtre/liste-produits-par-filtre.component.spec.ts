import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProduitsParFiltreComponent } from './liste-produits-par-filtre.component';

describe('ListeProduitsParFiltreComponent', () => {
  let component: ListeProduitsParFiltreComponent;
  let fixture: ComponentFixture<ListeProduitsParFiltreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeProduitsParFiltreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeProduitsParFiltreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
