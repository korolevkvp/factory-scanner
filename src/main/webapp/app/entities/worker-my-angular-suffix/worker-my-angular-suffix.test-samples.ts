import dayjs from 'dayjs/esm';

import { IWorkerMyAngularSuffix, NewWorkerMyAngularSuffix } from './worker-my-angular-suffix.model';

export const sampleWithRequiredData: IWorkerMyAngularSuffix = {
  id: 33577,
};

export const sampleWithPartialData: IWorkerMyAngularSuffix = {
  id: 65132,
  firstName: 'Derick',
};

export const sampleWithFullData: IWorkerMyAngularSuffix = {
  id: 87381,
  firstName: 'Kenyon',
  middleName: 'Кожанный reintermediate',
  lastName: 'Суворова',
  salary: 94870,
  phoneNumber: 'туризм',
  hireDate: dayjs('2023-04-07'),
  grade: 21228,
};

export const sampleWithNewData: NewWorkerMyAngularSuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
