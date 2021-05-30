import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProduitParSousCatComponent } from './liste-produit-par-sous-cat.component';

describe('ListeProduitParSousCatComponent', () => {
  let component: ListeProduitParSousCatComponent;
  let fixture: ComponentFixture<ListeProduitParSousCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeProduitParSousCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeProduitParSousCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
