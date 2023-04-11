import dayjs from 'dayjs/esm';
import { IJobMyAngularSuffix } from 'app/entities/job-my-angular-suffix/job-my-angular-suffix.model';
import { IFactoryMyAngularSuffix } from 'app/entities/factory-my-angular-suffix/factory-my-angular-suffix.model';
import { Grade } from 'app/entities/enumerations/grade.model';

export interface IWorkerMyAngularSuffix {
  id: number;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  salary?: number | null;
  phoneNumber?: string | null;
  hireDate?: dayjs.Dayjs | null;
  grade?: Grade | null;
  job?: Pick<IJobMyAngularSuffix, 'id' | 'name'> | null;
  factory?: Pick<IFactoryMyAngularSuffix, 'id' | 'name'> | null;
}

export type NewWorkerMyAngularSuffix = Omit<IWorkerMyAngularSuffix, 'id'> & { id: null };
