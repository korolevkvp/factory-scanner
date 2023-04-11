import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFactoryMyAngularSuffix, NewFactoryMyAngularSuffix } from '../factory-my-angular-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFactoryMyAngularSuffix for edit and NewFactoryMyAngularSuffixFormGroupInput for create.
 */
type FactoryMyAngularSuffixFormGroupInput = IFactoryMyAngularSuffix | PartialWithRequiredKeyOf<NewFactoryMyAngularSuffix>;

type FactoryMyAngularSuffixFormDefaults = Pick<NewFactoryMyAngularSuffix, 'id'>;

type FactoryMyAngularSuffixFormGroupContent = {
  id: FormControl<IFactoryMyAngularSuffix['id'] | NewFactoryMyAngularSuffix['id']>;
  name: FormControl<IFactoryMyAngularSuffix['name']>;
  address: FormControl<IFactoryMyAngularSuffix['address']>;
  postalCode: FormControl<IFactoryMyAngularSuffix['postalCode']>;
};

export type FactoryMyAngularSuffixFormGroup = FormGroup<FactoryMyAngularSuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FactoryMyAngularSuffixFormService {
  createFactoryMyAngularSuffixFormGroup(factory: FactoryMyAngularSuffixFormGroupInput = { id: null }): FactoryMyAngularSuffixFormGroup {
    const factoryRawValue = {
      ...this.getFormDefaults(),
      ...factory,
    };
    return new FormGroup<FactoryMyAngularSuffixFormGroupContent>({
      id: new FormControl(
        { value: factoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(factoryRawValue.name),
      address: new FormControl(factoryRawValue.address),
      postalCode: new FormControl(factoryRawValue.postalCode),
    });
  }

  getFactoryMyAngularSuffix(form: FactoryMyAngularSuffixFormGroup): IFactoryMyAngularSuffix | NewFactoryMyAngularSuffix {
    return form.getRawValue() as IFactoryMyAngularSuffix | NewFactoryMyAngularSuffix;
  }

  resetForm(form: FactoryMyAngularSuffixFormGroup, factory: FactoryMyAngularSuffixFormGroupInput): void {
    const factoryRawValue = { ...this.getFormDefaults(), ...factory };
    form.reset(
      {
        ...factoryRawValue,
        id: { value: factoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FactoryMyAngularSuffixFormDefaults {
    return {
      id: null,
    };
  }
}
