import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../machine-my-angular-suffix.test-samples';

import { MachineMyAngularSuffixFormService } from './machine-my-angular-suffix-form.service';

describe('MachineMyAngularSuffix Form Service', () => {
  let service: MachineMyAngularSuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachineMyAngularSuffixFormService);
  });

  describe('Service methods', () => {
    describe('createMachineMyAngularSuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMachineMyAngularSuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            model: expect.any(Object),
            type: expect.any(Object),
            factory: expect.any(Object),
          })
        );
      });

      it('passing IMachineMyAngularSuffix should create a new form with FormGroup', () => {
        const formGroup = service.createMachineMyAngularSuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            model: expect.any(Object),
            type: expect.any(Object),
            factory: expect.any(Object),
          })
        );
      });
    });

    describe('getMachineMyAngularSuffix', () => {
      it('should return NewMachineMyAngularSuffix for default MachineMyAngularSuffix initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMachineMyAngularSuffixFormGroup(sampleWithNewData);

        const machine = service.getMachineMyAngularSuffix(formGroup) as any;

        expect(machine).toMatchObject(sampleWithNewData);
      });

      it('should return NewMachineMyAngularSuffix for empty MachineMyAngularSuffix initial value', () => {
        const formGroup = service.createMachineMyAngularSuffixFormGroup();

        const machine = service.getMachineMyAngularSuffix(formGroup) as any;

        expect(machine).toMatchObject({});
      });

      it('should return IMachineMyAngularSuffix', () => {
        const formGroup = service.createMachineMyAngularSuffixFormGroup(sampleWithRequiredData);

        const machine = service.getMachineMyAngularSuffix(formGroup) as any;

        expect(machine).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMachineMyAngularSuffix should not enable id FormControl', () => {
        const formGroup = service.createMachineMyAngularSuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMachineMyAngularSuffix should disable id FormControl', () => {
        const formGroup = service.createMachineMyAngularSuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
