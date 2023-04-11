import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../factory-my-angular-suffix.test-samples';

import { FactoryMyAngularSuffixFormService } from './factory-my-angular-suffix-form.service';

describe('FactoryMyAngularSuffix Form Service', () => {
  let service: FactoryMyAngularSuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactoryMyAngularSuffixFormService);
  });

  describe('Service methods', () => {
    describe('createFactoryMyAngularSuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFactoryMyAngularSuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            address: expect.any(Object),
            postalCode: expect.any(Object),
          })
        );
      });

      it('passing IFactoryMyAngularSuffix should create a new form with FormGroup', () => {
        const formGroup = service.createFactoryMyAngularSuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            address: expect.any(Object),
            postalCode: expect.any(Object),
          })
        );
      });
    });

    describe('getFactoryMyAngularSuffix', () => {
      it('should return NewFactoryMyAngularSuffix for default FactoryMyAngularSuffix initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFactoryMyAngularSuffixFormGroup(sampleWithNewData);

        const factory = service.getFactoryMyAngularSuffix(formGroup) as any;

        expect(factory).toMatchObject(sampleWithNewData);
      });

      it('should return NewFactoryMyAngularSuffix for empty FactoryMyAngularSuffix initial value', () => {
        const formGroup = service.createFactoryMyAngularSuffixFormGroup();

        const factory = service.getFactoryMyAngularSuffix(formGroup) as any;

        expect(factory).toMatchObject({});
      });

      it('should return IFactoryMyAngularSuffix', () => {
        const formGroup = service.createFactoryMyAngularSuffixFormGroup(sampleWithRequiredData);

        const factory = service.getFactoryMyAngularSuffix(formGroup) as any;

        expect(factory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFactoryMyAngularSuffix should not enable id FormControl', () => {
        const formGroup = service.createFactoryMyAngularSuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFactoryMyAngularSuffix should disable id FormControl', () => {
        const formGroup = service.createFactoryMyAngularSuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
