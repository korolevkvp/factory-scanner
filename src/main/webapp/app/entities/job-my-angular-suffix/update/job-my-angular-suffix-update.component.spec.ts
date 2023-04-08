import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { JobMyAngularSuffixFormService } from './job-my-angular-suffix-form.service';
import { JobMyAngularSuffixService } from '../service/job-my-angular-suffix.service';
import { IJobMyAngularSuffix } from '../job-my-angular-suffix.model';

import { JobMyAngularSuffixUpdateComponent } from './job-my-angular-suffix-update.component';

describe('JobMyAngularSuffix Management Update Component', () => {
  let comp: JobMyAngularSuffixUpdateComponent;
  let fixture: ComponentFixture<JobMyAngularSuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let jobFormService: JobMyAngularSuffixFormService;
  let jobService: JobMyAngularSuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [JobMyAngularSuffixUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(JobMyAngularSuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(JobMyAngularSuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    jobFormService = TestBed.inject(JobMyAngularSuffixFormService);
    jobService = TestBed.inject(JobMyAngularSuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const job: IJobMyAngularSuffix = { id: 456 };

      activatedRoute.data = of({ job });
      comp.ngOnInit();

      expect(comp.job).toEqual(job);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobMyAngularSuffix>>();
      const job = { id: 123 };
      jest.spyOn(jobFormService, 'getJobMyAngularSuffix').mockReturnValue(job);
      jest.spyOn(jobService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ job });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: job }));
      saveSubject.complete();

      // THEN
      expect(jobFormService.getJobMyAngularSuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(jobService.update).toHaveBeenCalledWith(expect.objectContaining(job));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobMyAngularSuffix>>();
      const job = { id: 123 };
      jest.spyOn(jobFormService, 'getJobMyAngularSuffix').mockReturnValue({ id: null });
      jest.spyOn(jobService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ job: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: job }));
      saveSubject.complete();

      // THEN
      expect(jobFormService.getJobMyAngularSuffix).toHaveBeenCalled();
      expect(jobService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobMyAngularSuffix>>();
      const job = { id: 123 };
      jest.spyOn(jobService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ job });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(jobService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
