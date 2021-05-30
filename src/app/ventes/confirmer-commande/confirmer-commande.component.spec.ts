import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmerCommandeComponent } from './confirmer-commande.component';

describe('ConfirmerCommandeComponent', () => {
  let component: ConfirmerCommandeComponent;
  let fixture: ComponentFixture<ConfirmerCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmerCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmerCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
