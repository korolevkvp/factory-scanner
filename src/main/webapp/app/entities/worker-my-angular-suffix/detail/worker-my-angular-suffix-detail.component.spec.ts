import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WorkerMyAngularSuffixDetailComponent } from './worker-my-angular-suffix-detail.component';

describe('WorkerMyAngularSuffix Management Detail Component', () => {
  let comp: WorkerMyAngularSuffixDetailComponent;
  let fixture: ComponentFixture<WorkerMyAngularSuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkerMyAngularSuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ worker: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(WorkerMyAngularSuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(WorkerMyAngularSuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load worker on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.worker).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
