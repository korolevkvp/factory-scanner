import { MachineType } from 'app/entities/enumerations/machine-type.model';

import { IMachineMyAngularSuffix, NewMachineMyAngularSuffix } from './machine-my-angular-suffix.model';

export const sampleWithRequiredData: IMachineMyAngularSuffix = {
  id: 87927,
};

export const sampleWithPartialData: IMachineMyAngularSuffix = {
  id: 29289,
  model: 'PNG Стул',
  type: MachineType['MILLING'],
};

export const sampleWithFullData: IMachineMyAngularSuffix = {
  id: 40968,
  model: 'Franc payment',
  type: MachineType['GRINDING'],
};

export const sampleWithNewData: NewMachineMyAngularSuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
