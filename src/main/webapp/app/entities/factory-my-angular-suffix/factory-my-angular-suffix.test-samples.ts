import { IFactoryMyAngularSuffix, NewFactoryMyAngularSuffix } from './factory-my-angular-suffix.model';

export const sampleWithRequiredData: IFactoryMyAngularSuffix = {
  id: 6421,
};

export const sampleWithPartialData: IFactoryMyAngularSuffix = {
  id: 41643,
  name: 'invoice серый Buckinghamshire',
  address: 'аналитик менеджер',
};

export const sampleWithFullData: IFactoryMyAngularSuffix = {
  id: 30946,
  name: 'Account support',
  address: 'свободно-распростроняемый',
  postalCode: 'автономный Региональный Практичный',
};

export const sampleWithNewData: NewFactoryMyAngularSuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
