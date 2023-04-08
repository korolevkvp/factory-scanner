import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IWorkerMyAngularSuffix, NewWorkerMyAngularSuffix } from '../worker-my-angular-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWorkerMyAngularSuffix for edit and NewWorkerMyAngularSuffixFormGroupInput for create.
 */
type WorkerMyAngularSuffixFormGroupInput = IWorkerMyAngularSuffix | PartialWithRequiredKeyOf<NewWorkerMyAngularSuffix>;

type WorkerMyAngularSuffixFormDefaults = Pick<NewWorkerMyAngularSuffix, 'id'>;

type WorkerMyAngularSuffixFormGroupContent = {
  id: FormControl<IWorkerMyAngularSuffix['id'] | NewWorkerMyAngularSuffix['id']>;
  firstName: FormControl<IWorkerMyAngularSuffix['firstName']>;
  middleName: FormControl<IWorkerMyAngularSuffix['middleName']>;
  lastName: FormControl<IWorkerMyAngularSuffix['lastName']>;
  salary: FormControl<IWorkerMyAngularSuffix['salary']>;
  phoneNumber: FormControl<IWorkerMyAngularSuffix['phoneNumber']>;
  hireDate: FormControl<IWorkerMyAngularSuffix['hireDate']>;
  grade: FormControl<IWorkerMyAngularSuffix['grade']>;
  job: FormControl<IWorkerMyAngularSuffix['job']>;
  factory: FormControl<IWorkerMyAngularSuffix['factory']>;
};

export type WorkerMyAngularSuffixFormGroup = FormGroup<WorkerMyAngularSuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WorkerMyAngularSuffixFormService {
  createWorkerMyAngularSuffixFormGroup(worker: WorkerMyAngularSuffixFormGroupInput = { id: null }): WorkerMyAngularSuffixFormGroup {
    const workerRawValue = {
      ...this.getFormDefaults(),
      ...worker,
    };
    return new FormGroup<WorkerMyAngularSuffixFormGroupContent>({
      id: new FormControl(
        { value: workerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      firstName: new FormControl(workerRawValue.firstName),
      middleName: new FormControl(workerRawValue.middleName),
      lastName: new FormControl(workerRawValue.lastName),
      salary: new FormControl(workerRawValue.salary),
      phoneNumber: new FormControl(workerRawValue.phoneNumber),
      hireDate: new FormControl(workerRawValue.hireDate),
      grade: new FormControl(workerRawValue.grade),
      job: new FormControl(workerRawValue.job),
      factory: new FormControl(workerRawValue.factory),
    });
  }

  getWorkerMyAngularSuffix(form: WorkerMyAngularSuffixFormGroup): IWorkerMyAngularSuffix | NewWorkerMyAngularSuffix {
    return form.getRawValue() as IWorkerMyAngularSuffix | NewWorkerMyAngularSuffix;
  }

  resetForm(form: WorkerMyAngularSuffixFormGroup, worker: WorkerMyAngularSuffixFormGroupInput): void {
    const workerRawValue = { ...this.getFormDefaults(), ...worker };
    form.reset(
      {
        ...workerRawValue,
        id: { value: workerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): WorkerMyAngularSuffixFormDefaults {
    return {
      id: null,
    };
  }
}
