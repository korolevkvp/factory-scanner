import { JobType } from 'app/entities/enumerations/job-type.model';

export interface IJobMyAngularSuffix {
  id: number;
  title?: string | null;
  type?: JobType | null;
  minSalary?: number | null;
  maxSalary?: number | null;
}

export type NewJobMyAngularSuffix = Omit<IJobMyAngularSuffix, 'id'> & { id: null };
