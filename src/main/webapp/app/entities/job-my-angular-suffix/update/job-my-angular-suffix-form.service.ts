import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IJobMyAngularSuffix, NewJobMyAngularSuffix } from '../job-my-angular-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IJobMyAngularSuffix for edit and NewJobMyAngularSuffixFormGroupInput for create.
 */
type JobMyAngularSuffixFormGroupInput = IJobMyAngularSuffix | PartialWithRequiredKeyOf<NewJobMyAngularSuffix>;

type JobMyAngularSuffixFormDefaults = Pick<NewJobMyAngularSuffix, 'id'>;

type JobMyAngularSuffixFormGroupContent = {
  id: FormControl<IJobMyAngularSuffix['id'] | NewJobMyAngularSuffix['id']>;
  name: FormControl<IJobMyAngularSuffix['name']>;
  type: FormControl<IJobMyAngularSuffix['type']>;
  minSalary: FormControl<IJobMyAngularSuffix['minSalary']>;
  maxSalary: FormControl<IJobMyAngularSuffix['maxSalary']>;
};

export type JobMyAngularSuffixFormGroup = FormGroup<JobMyAngularSuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class JobMyAngularSuffixFormService {
  createJobMyAngularSuffixFormGroup(job: JobMyAngularSuffixFormGroupInput = { id: null }): JobMyAngularSuffixFormGroup {
    const jobRawValue = {
      ...this.getFormDefaults(),
      ...job,
    };
    return new FormGroup<JobMyAngularSuffixFormGroupContent>({
      id: new FormControl(
        { value: jobRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(jobRawValue.name),
      type: new FormControl(jobRawValue.type),
      minSalary: new FormControl(jobRawValue.minSalary),
      maxSalary: new FormControl(jobRawValue.maxSalary),
    });
  }

  getJobMyAngularSuffix(form: JobMyAngularSuffixFormGroup): IJobMyAngularSuffix | NewJobMyAngularSuffix {
    return form.getRawValue() as IJobMyAngularSuffix | NewJobMyAngularSuffix;
  }

  resetForm(form: JobMyAngularSuffixFormGroup, job: JobMyAngularSuffixFormGroupInput): void {
    const jobRawValue = { ...this.getFormDefaults(), ...job };
    form.reset(
      {
        ...jobRawValue,
        id: { value: jobRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): JobMyAngularSuffixFormDefaults {
    return {
      id: null,
    };
  }
}
