import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GaleriesPage } from './galeries.page';

describe('GaleriesPage', () => {
  let component: GaleriesPage;
  let fixture: ComponentFixture<GaleriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GaleriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
