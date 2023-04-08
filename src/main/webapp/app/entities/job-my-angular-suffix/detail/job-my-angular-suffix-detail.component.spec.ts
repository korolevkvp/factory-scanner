import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobMyAngularSuffixDetailComponent } from './job-my-angular-suffix-detail.component';

describe('JobMyAngularSuffix Management Detail Component', () => {
  let comp: JobMyAngularSuffixDetailComponent;
  let fixture: ComponentFixture<JobMyAngularSuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobMyAngularSuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ job: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(JobMyAngularSuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(JobMyAngularSuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load job on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.job).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
