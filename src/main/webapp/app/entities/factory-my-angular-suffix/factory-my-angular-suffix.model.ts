export interface IFactoryMyAngularSuffix {
  id: number;
  name?: string | null;
  address?: string | null;
  postalCode?: string | null;
}

export type NewFactoryMyAngularSuffix = Omit<IFactoryMyAngularSuffix, 'id'> & { id: null };
