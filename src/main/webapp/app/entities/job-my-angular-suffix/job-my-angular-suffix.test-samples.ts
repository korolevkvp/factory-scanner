import { JobType } from 'app/entities/enumerations/job-type.model';

import { IJobMyAngularSuffix, NewJobMyAngularSuffix } from './job-my-angular-suffix.model';

export const sampleWithRequiredData: IJobMyAngularSuffix = {
  id: 43395,
};

export const sampleWithPartialData: IJobMyAngularSuffix = {
  id: 59185,
  title: 'Грубый Фильмы systemic',
  maxSalary: 32907,
};

export const sampleWithFullData: IJobMyAngularSuffix = {
  id: 90392,
  title: 'Ringgit functionalities Fundamental',
  type: JobType['SUPPORTIVE'],
  minSalary: 17658,
  maxSalary: 47285,
};

export const sampleWithNewData: NewJobMyAngularSuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
