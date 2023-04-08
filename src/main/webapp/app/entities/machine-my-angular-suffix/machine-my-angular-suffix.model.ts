import { IFactoryMyAngularSuffix } from 'app/entities/factory-my-angular-suffix/factory-my-angular-suffix.model';
import { MachineType } from 'app/entities/enumerations/machine-type.model';

export interface IMachineMyAngularSuffix {
  id: number;
  model?: string | null;
  type?: MachineType | null;
  factory?: Pick<IFactoryMyAngularSuffix, 'id'> | null;
}

export type NewMachineMyAngularSuffix = Omit<IMachineMyAngularSuffix, 'id'> & { id: null };
