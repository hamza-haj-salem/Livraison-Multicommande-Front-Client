import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProduitsParPrixComponent } from './liste-produits-par-prix.component';

describe('ListeProduitsParPrixComponent', () => {
  let component: ListeProduitsParPrixComponent;
  let fixture: ComponentFixture<ListeProduitsParPrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeProduitsParPrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeProduitsParPrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
