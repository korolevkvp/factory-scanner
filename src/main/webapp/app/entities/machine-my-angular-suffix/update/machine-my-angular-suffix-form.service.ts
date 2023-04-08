import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMachineMyAngularSuffix, NewMachineMyAngularSuffix } from '../machine-my-angular-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMachineMyAngularSuffix for edit and NewMachineMyAngularSuffixFormGroupInput for create.
 */
type MachineMyAngularSuffixFormGroupInput = IMachineMyAngularSuffix | PartialWithRequiredKeyOf<NewMachineMyAngularSuffix>;

type MachineMyAngularSuffixFormDefaults = Pick<NewMachineMyAngularSuffix, 'id'>;

type MachineMyAngularSuffixFormGroupContent = {
  id: FormControl<IMachineMyAngularSuffix['id'] | NewMachineMyAngularSuffix['id']>;
  model: FormControl<IMachineMyAngularSuffix['model']>;
  type: FormControl<IMachineMyAngularSuffix['type']>;
  factory: FormControl<IMachineMyAngularSuffix['factory']>;
};

export type MachineMyAngularSuffixFormGroup = FormGroup<MachineMyAngularSuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MachineMyAngularSuffixFormService {
  createMachineMyAngularSuffixFormGroup(machine: MachineMyAngularSuffixFormGroupInput = { id: null }): MachineMyAngularSuffixFormGroup {
    const machineRawValue = {
      ...this.getFormDefaults(),
      ...machine,
    };
    return new FormGroup<MachineMyAngularSuffixFormGroupContent>({
      id: new FormControl(
        { value: machineRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      model: new FormControl(machineRawValue.model),
      type: new FormControl(machineRawValue.type),
      factory: new FormControl(machineRawValue.factory),
    });
  }

  getMachineMyAngularSuffix(form: MachineMyAngularSuffixFormGroup): IMachineMyAngularSuffix | NewMachineMyAngularSuffix {
    return form.getRawValue() as IMachineMyAngularSuffix | NewMachineMyAngularSuffix;
  }

  resetForm(form: MachineMyAngularSuffixFormGroup, machine: MachineMyAngularSuffixFormGroupInput): void {
    const machineRawValue = { ...this.getFormDefaults(), ...machine };
    form.reset(
      {
        ...machineRawValue,
        id: { value: machineRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MachineMyAngularSuffixFormDefaults {
    return {
      id: null,
    };
  }
}
