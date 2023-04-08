import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MachineMyAngularSuffixDetailComponent } from './machine-my-angular-suffix-detail.component';

describe('MachineMyAngularSuffix Management Detail Component', () => {
  let comp: MachineMyAngularSuffixDetailComponent;
  let fixture: ComponentFixture<MachineMyAngularSuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MachineMyAngularSuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ machine: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MachineMyAngularSuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MachineMyAngularSuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load machine on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.machine).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
