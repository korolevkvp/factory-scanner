import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { WorkerMyAngularSuffixFormService } from './worker-my-angular-suffix-form.service';
import { WorkerMyAngularSuffixService } from '../service/worker-my-angular-suffix.service';
import { IWorkerMyAngularSuffix } from '../worker-my-angular-suffix.model';
import { IJobMyAngularSuffix } from 'app/entities/job-my-angular-suffix/job-my-angular-suffix.model';
import { JobMyAngularSuffixService } from 'app/entities/job-my-angular-suffix/service/job-my-angular-suffix.service';
import { IFactoryMyAngularSuffix } from 'app/entities/factory-my-angular-suffix/factory-my-angular-suffix.model';
import { FactoryMyAngularSuffixService } from 'app/entities/factory-my-angular-suffix/service/factory-my-angular-suffix.service';

import { WorkerMyAngularSuffixUpdateComponent } from './worker-my-angular-suffix-update.component';

describe('WorkerMyAngularSuffix Management Update Component', () => {
  let comp: WorkerMyAngularSuffixUpdateComponent;
  let fixture: ComponentFixture<WorkerMyAngularSuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let workerFormService: WorkerMyAngularSuffixFormService;
  let workerService: WorkerMyAngularSuffixService;
  let jobService: JobMyAngularSuffixService;
  let factoryService: FactoryMyAngularSuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [WorkerMyAngularSuffixUpdateComponent],
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
      .overrideTemplate(WorkerMyAngularSuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WorkerMyAngularSuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    workerFormService = TestBed.inject(WorkerMyAngularSuffixFormService);
    workerService = TestBed.inject(WorkerMyAngularSuffixService);
    jobService = TestBed.inject(JobMyAngularSuffixService);
    factoryService = TestBed.inject(FactoryMyAngularSuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call JobMyAngularSuffix query and add missing value', () => {
      const worker: IWorkerMyAngularSuffix = { id: 456 };
      const job: IJobMyAngularSuffix = { id: 77413 };
      worker.job = job;

      const jobCollection: IJobMyAngularSuffix[] = [{ id: 31690 }];
      jest.spyOn(jobService, 'query').mockReturnValue(of(new HttpResponse({ body: jobCollection })));
      const additionalJobMyAngularSuffixes = [job];
      const expectedCollection: IJobMyAngularSuffix[] = [...additionalJobMyAngularSuffixes, ...jobCollection];
      jest.spyOn(jobService, 'addJobMyAngularSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ worker });
      comp.ngOnInit();

      expect(jobService.query).toHaveBeenCalled();
      expect(jobService.addJobMyAngularSuffixToCollectionIfMissing).toHaveBeenCalledWith(
        jobCollection,
        ...additionalJobMyAngularSuffixes.map(expect.objectContaining)
      );
      expect(comp.jobsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call FactoryMyAngularSuffix query and add missing value', () => {
      const worker: IWorkerMyAngularSuffix = { id: 456 };
      const factory: IFactoryMyAngularSuffix = { id: 9621 };
      worker.factory = factory;

      const factoryCollection: IFactoryMyAngularSuffix[] = [{ id: 79733 }];
      jest.spyOn(factoryService, 'query').mockReturnValue(of(new HttpResponse({ body: factoryCollection })));
      const additionalFactoryMyAngularSuffixes = [factory];
      const expectedCollection: IFactoryMyAngularSuffix[] = [...additionalFactoryMyAngularSuffixes, ...factoryCollection];
      jest.spyOn(factoryService, 'addFactoryMyAngularSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ worker });
      comp.ngOnInit();

      expect(factoryService.query).toHaveBeenCalled();
      expect(factoryService.addFactoryMyAngularSuffixToCollectionIfMissing).toHaveBeenCalledWith(
        factoryCollection,
        ...additionalFactoryMyAngularSuffixes.map(expect.objectContaining)
      );
      expect(comp.factoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const worker: IWorkerMyAngularSuffix = { id: 456 };
      const job: IJobMyAngularSuffix = { id: 35538 };
      worker.job = job;
      const factory: IFactoryMyAngularSuffix = { id: 71822 };
      worker.factory = factory;

      activatedRoute.data = of({ worker });
      comp.ngOnInit();

      expect(comp.jobsSharedCollection).toContain(job);
      expect(comp.factoriesSharedCollection).toContain(factory);
      expect(comp.worker).toEqual(worker);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkerMyAngularSuffix>>();
      const worker = { id: 123 };
      jest.spyOn(workerFormService, 'getWorkerMyAngularSuffix').mockReturnValue(worker);
      jest.spyOn(workerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ worker });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: worker }));
      saveSubject.complete();

      // THEN
      expect(workerFormService.getWorkerMyAngularSuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(workerService.update).toHaveBeenCalledWith(expect.objectContaining(worker));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkerMyAngularSuffix>>();
      const worker = { id: 123 };
      jest.spyOn(workerFormService, 'getWorkerMyAngularSuffix').mockReturnValue({ id: null });
      jest.spyOn(workerService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ worker: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: worker }));
      saveSubject.complete();

      // THEN
      expect(workerFormService.getWorkerMyAngularSuffix).toHaveBeenCalled();
      expect(workerService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkerMyAngularSuffix>>();
      const worker = { id: 123 };
      jest.spyOn(workerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ worker });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(workerService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareJobMyAngularSuffix', () => {
      it('Should forward to jobService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(jobService, 'compareJobMyAngularSuffix');
        comp.compareJobMyAngularSuffix(entity, entity2);
        expect(jobService.compareJobMyAngularSuffix).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareFactoryMyAngularSuffix', () => {
      it('Should forward to factoryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(factoryService, 'compareFactoryMyAngularSuffix');
        comp.compareFactoryMyAngularSuffix(entity, entity2);
        expect(factoryService.compareFactoryMyAngularSuffix).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
