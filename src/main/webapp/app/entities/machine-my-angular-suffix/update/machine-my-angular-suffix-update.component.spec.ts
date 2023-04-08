import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MachineMyAngularSuffixFormService } from './machine-my-angular-suffix-form.service';
import { MachineMyAngularSuffixService } from '../service/machine-my-angular-suffix.service';
import { IMachineMyAngularSuffix } from '../machine-my-angular-suffix.model';
import { IFactoryMyAngularSuffix } from 'app/entities/factory-my-angular-suffix/factory-my-angular-suffix.model';
import { FactoryMyAngularSuffixService } from 'app/entities/factory-my-angular-suffix/service/factory-my-angular-suffix.service';

import { MachineMyAngularSuffixUpdateComponent } from './machine-my-angular-suffix-update.component';

describe('MachineMyAngularSuffix Management Update Component', () => {
  let comp: MachineMyAngularSuffixUpdateComponent;
  let fixture: ComponentFixture<MachineMyAngularSuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let machineFormService: MachineMyAngularSuffixFormService;
  let machineService: MachineMyAngularSuffixService;
  let factoryService: FactoryMyAngularSuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MachineMyAngularSuffixUpdateComponent],
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
      .overrideTemplate(MachineMyAngularSuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MachineMyAngularSuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    machineFormService = TestBed.inject(MachineMyAngularSuffixFormService);
    machineService = TestBed.inject(MachineMyAngularSuffixService);
    factoryService = TestBed.inject(FactoryMyAngularSuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call FactoryMyAngularSuffix query and add missing value', () => {
      const machine: IMachineMyAngularSuffix = { id: 456 };
      const factory: IFactoryMyAngularSuffix = { id: 74908 };
      machine.factory = factory;

      const factoryCollection: IFactoryMyAngularSuffix[] = [{ id: 71554 }];
      jest.spyOn(factoryService, 'query').mockReturnValue(of(new HttpResponse({ body: factoryCollection })));
      const additionalFactoryMyAngularSuffixes = [factory];
      const expectedCollection: IFactoryMyAngularSuffix[] = [...additionalFactoryMyAngularSuffixes, ...factoryCollection];
      jest.spyOn(factoryService, 'addFactoryMyAngularSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ machine });
      comp.ngOnInit();

      expect(factoryService.query).toHaveBeenCalled();
      expect(factoryService.addFactoryMyAngularSuffixToCollectionIfMissing).toHaveBeenCalledWith(
        factoryCollection,
        ...additionalFactoryMyAngularSuffixes.map(expect.objectContaining)
      );
      expect(comp.factoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const machine: IMachineMyAngularSuffix = { id: 456 };
      const factory: IFactoryMyAngularSuffix = { id: 71167 };
      machine.factory = factory;

      activatedRoute.data = of({ machine });
      comp.ngOnInit();

      expect(comp.factoriesSharedCollection).toContain(factory);
      expect(comp.machine).toEqual(machine);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMachineMyAngularSuffix>>();
      const machine = { id: 123 };
      jest.spyOn(machineFormService, 'getMachineMyAngularSuffix').mockReturnValue(machine);
      jest.spyOn(machineService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ machine });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: machine }));
      saveSubject.complete();

      // THEN
      expect(machineFormService.getMachineMyAngularSuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(machineService.update).toHaveBeenCalledWith(expect.objectContaining(machine));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMachineMyAngularSuffix>>();
      const machine = { id: 123 };
      jest.spyOn(machineFormService, 'getMachineMyAngularSuffix').mockReturnValue({ id: null });
      jest.spyOn(machineService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ machine: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: machine }));
      saveSubject.complete();

      // THEN
      expect(machineFormService.getMachineMyAngularSuffix).toHaveBeenCalled();
      expect(machineService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMachineMyAngularSuffix>>();
      const machine = { id: 123 };
      jest.spyOn(machineService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ machine });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(machineService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
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
