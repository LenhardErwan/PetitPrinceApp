import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TutoPage } from './tuto.page';

describe('TutoPage', () => {
  let component: TutoPage;
  let fixture: ComponentFixture<TutoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
