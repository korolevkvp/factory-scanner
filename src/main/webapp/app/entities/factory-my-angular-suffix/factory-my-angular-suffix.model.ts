export interface IFactoryMyAngularSuffix {
  id: number;
  name?: string | null;
  streetAddress?: string | null;
  postalCode?: string | null;
  city?: string | null;
}

export type NewFactoryMyAngularSuffix = Omit<IFactoryMyAngularSuffix, 'id'> & { id: null };
