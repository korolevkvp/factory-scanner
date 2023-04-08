import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FactoryMyAngularSuffixDetailComponent } from './factory-my-angular-suffix-detail.component';

describe('FactoryMyAngularSuffix Management Detail Component', () => {
  let comp: FactoryMyAngularSuffixDetailComponent;
  let fixture: ComponentFixture<FactoryMyAngularSuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FactoryMyAngularSuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ factory: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(FactoryMyAngularSuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FactoryMyAngularSuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load factory on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.factory).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
