import { JobType } from 'app/entities/enumerations/job-type.model';

import { IJobMyAngularSuffix, NewJobMyAngularSuffix } from './job-my-angular-suffix.model';

export const sampleWithRequiredData: IJobMyAngularSuffix = {
  id: 43395,
};

export const sampleWithPartialData: IJobMyAngularSuffix = {
  id: 95627,
  name: 'Свитер',
  maxSalary: 6918,
  gradeCount: 4480,
};

export const sampleWithFullData: IJobMyAngularSuffix = {
  id: 26191,
  name: 'Клатч Нижегородская streamline',
  type: JobType['SUPPORTIVE'],
  minSalary: 66360,
  maxSalary: 28986,
  gradeCount: 17658,
};

export const sampleWithNewData: NewJobMyAngularSuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
