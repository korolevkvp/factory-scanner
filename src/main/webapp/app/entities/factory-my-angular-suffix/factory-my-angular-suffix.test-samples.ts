import { IFactoryMyAngularSuffix, NewFactoryMyAngularSuffix } from './factory-my-angular-suffix.model';

export const sampleWithRequiredData: IFactoryMyAngularSuffix = {
  id: 6421,
};

export const sampleWithPartialData: IFactoryMyAngularSuffix = {
  id: 77060,
  name: 'твердотельный benchmark',
  streetAddress: 'Account Гранитный Южно-Африканская',
};

export const sampleWithFullData: IFactoryMyAngularSuffix = {
  id: 39380,
  name: 'static Международный',
  streetAddress: 'Stand-alone автономный Региональный',
  postalCode: 'онлайн',
  city: 'Lake Rogerberg',
};

export const sampleWithNewData: NewFactoryMyAngularSuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
