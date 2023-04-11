import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../job-my-angular-suffix.test-samples';

import { JobMyAngularSuffixFormService } from './job-my-angular-suffix-form.service';

describe('JobMyAngularSuffix Form Service', () => {
  let service: JobMyAngularSuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobMyAngularSuffixFormService);
  });

  describe('Service methods', () => {
    describe('createJobMyAngularSuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createJobMyAngularSuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            type: expect.any(Object),
            minSalary: expect.any(Object),
            maxSalary: expect.any(Object),
          })
        );
      });

      it('passing IJobMyAngularSuffix should create a new form with FormGroup', () => {
        const formGroup = service.createJobMyAngularSuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            type: expect.any(Object),
            minSalary: expect.any(Object),
            maxSalary: expect.any(Object),
          })
        );
      });
    });

    describe('getJobMyAngularSuffix', () => {
      it('should return NewJobMyAngularSuffix for default JobMyAngularSuffix initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createJobMyAngularSuffixFormGroup(sampleWithNewData);

        const job = service.getJobMyAngularSuffix(formGroup) as any;

        expect(job).toMatchObject(sampleWithNewData);
      });

      it('should return NewJobMyAngularSuffix for empty JobMyAngularSuffix initial value', () => {
        const formGroup = service.createJobMyAngularSuffixFormGroup();

        const job = service.getJobMyAngularSuffix(formGroup) as any;

        expect(job).toMatchObject({});
      });

      it('should return IJobMyAngularSuffix', () => {
        const formGroup = service.createJobMyAngularSuffixFormGroup(sampleWithRequiredData);

        const job = service.getJobMyAngularSuffix(formGroup) as any;

        expect(job).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IJobMyAngularSuffix should not enable id FormControl', () => {
        const formGroup = service.createJobMyAngularSuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewJobMyAngularSuffix should disable id FormControl', () => {
        const formGroup = service.createJobMyAngularSuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
