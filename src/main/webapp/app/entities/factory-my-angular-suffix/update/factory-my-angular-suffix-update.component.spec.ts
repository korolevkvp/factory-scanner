import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FactoryMyAngularSuffixFormService } from './factory-my-angular-suffix-form.service';
import { FactoryMyAngularSuffixService } from '../service/factory-my-angular-suffix.service';
import { IFactoryMyAngularSuffix } from '../factory-my-angular-suffix.model';

import { FactoryMyAngularSuffixUpdateComponent } from './factory-my-angular-suffix-update.component';

describe('FactoryMyAngularSuffix Management Update Component', () => {
  let comp: FactoryMyAngularSuffixUpdateComponent;
  let fixture: ComponentFixture<FactoryMyAngularSuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let factoryFormService: FactoryMyAngularSuffixFormService;
  let factoryService: FactoryMyAngularSuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FactoryMyAngularSuffixUpdateComponent],
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
      .overrideTemplate(FactoryMyAngularSuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FactoryMyAngularSuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    factoryFormService = TestBed.inject(FactoryMyAngularSuffixFormService);
    factoryService = TestBed.inject(FactoryMyAngularSuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const factory: IFactoryMyAngularSuffix = { id: 456 };

      activatedRoute.data = of({ factory });
      comp.ngOnInit();

      expect(comp.factory).toEqual(factory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFactoryMyAngularSuffix>>();
      const factory = { id: 123 };
      jest.spyOn(factoryFormService, 'getFactoryMyAngularSuffix').mockReturnValue(factory);
      jest.spyOn(factoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ factory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: factory }));
      saveSubject.complete();

      // THEN
      expect(factoryFormService.getFactoryMyAngularSuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(factoryService.update).toHaveBeenCalledWith(expect.objectContaining(factory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFactoryMyAngularSuffix>>();
      const factory = { id: 123 };
      jest.spyOn(factoryFormService, 'getFactoryMyAngularSuffix').mockReturnValue({ id: null });
      jest.spyOn(factoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ factory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: factory }));
      saveSubject.complete();

      // THEN
      expect(factoryFormService.getFactoryMyAngularSuffix).toHaveBeenCalled();
      expect(factoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFactoryMyAngularSuffix>>();
      const factory = { id: 123 };
      jest.spyOn(factoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ factory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(factoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
