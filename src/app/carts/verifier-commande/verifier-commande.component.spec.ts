import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifierCommandeComponent } from './verifier-commande.component';

describe('VerifierCommandeComponent', () => {
  let component: VerifierCommandeComponent;
  let fixture: ComponentFixture<VerifierCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifierCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifierCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
