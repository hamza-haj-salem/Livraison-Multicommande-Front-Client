import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProduitsComponent } from './details-produits.component';

describe('DetailsProduitsComponent', () => {
  let component: DetailsProduitsComponent;
  let fixture: ComponentFixture<DetailsProduitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsProduitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
