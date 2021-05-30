import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProduitsBarreLateraleComponent } from './liste-produits-barre-laterale.component';

describe('ListeProduitsBarreLateraleComponent', () => {
  let component: ListeProduitsBarreLateraleComponent;
  let fixture: ComponentFixture<ListeProduitsBarreLateraleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeProduitsBarreLateraleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeProduitsBarreLateraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
