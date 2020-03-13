import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GaleriePage } from './galerie.page';

describe('GaleriePage', () => {
  let component: GaleriePage;
  let fixture: ComponentFixture<GaleriePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GaleriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
