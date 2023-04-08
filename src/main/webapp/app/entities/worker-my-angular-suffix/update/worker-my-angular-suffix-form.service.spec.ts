import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../worker-my-angular-suffix.test-samples';

import { WorkerMyAngularSuffixFormService } from './worker-my-angular-suffix-form.service';

describe('WorkerMyAngularSuffix Form Service', () => {
  let service: WorkerMyAngularSuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerMyAngularSuffixFormService);
  });

  describe('Service methods', () => {
    describe('createWorkerMyAngularSuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWorkerMyAngularSuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            firstName: expect.any(Object),
            middleName: expect.any(Object),
            lastName: expect.any(Object),
            salary: expect.any(Object),
            phoneNumber: expect.any(Object),
            hireDate: expect.any(Object),
            grade: expect.any(Object),
            job: expect.any(Object),
            factory: expect.any(Object),
          })
        );
      });

      it('passing IWorkerMyAngularSuffix should create a new form with FormGroup', () => {
        const formGroup = service.createWorkerMyAngularSuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            firstName: expect.any(Object),
            middleName: expect.any(Object),
            lastName: expect.any(Object),
            salary: expect.any(Object),
            phoneNumber: expect.any(Object),
            hireDate: expect.any(Object),
            grade: expect.any(Object),
            job: expect.any(Object),
            factory: expect.any(Object),
          })
        );
      });
    });

    describe('getWorkerMyAngularSuffix', () => {
      it('should return NewWorkerMyAngularSuffix for default WorkerMyAngularSuffix initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createWorkerMyAngularSuffixFormGroup(sampleWithNewData);

        const worker = service.getWorkerMyAngularSuffix(formGroup) as any;

        expect(worker).toMatchObject(sampleWithNewData);
      });

      it('should return NewWorkerMyAngularSuffix for empty WorkerMyAngularSuffix initial value', () => {
        const formGroup = service.createWorkerMyAngularSuffixFormGroup();

        const worker = service.getWorkerMyAngularSuffix(formGroup) as any;

        expect(worker).toMatchObject({});
      });

      it('should return IWorkerMyAngularSuffix', () => {
        const formGroup = service.createWorkerMyAngularSuffixFormGroup(sampleWithRequiredData);

        const worker = service.getWorkerMyAngularSuffix(formGroup) as any;

        expect(worker).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWorkerMyAngularSuffix should not enable id FormControl', () => {
        const formGroup = service.createWorkerMyAngularSuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWorkerMyAngularSuffix should disable id FormControl', () => {
        const formGroup = service.createWorkerMyAngularSuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
