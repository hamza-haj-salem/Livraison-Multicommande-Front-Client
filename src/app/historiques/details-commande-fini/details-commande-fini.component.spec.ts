import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCommandeFiniComponent } from './details-commande-fini.component';

describe('DetailsCommandeFiniComponent', () => {
  let component: DetailsCommandeFiniComponent;
  let fixture: ComponentFixture<DetailsCommandeFiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCommandeFiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCommandeFiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
