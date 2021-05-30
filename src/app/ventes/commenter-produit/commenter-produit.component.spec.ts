import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommenterProduitComponent } from './commenter-produit.component';

describe('CommenterProduitComponent', () => {
  let component: CommenterProduitComponent;
  let fixture: ComponentFixture<CommenterProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommenterProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommenterProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
