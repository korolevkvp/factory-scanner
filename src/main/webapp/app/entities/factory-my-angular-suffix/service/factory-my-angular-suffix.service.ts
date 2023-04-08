import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFactoryMyAngularSuffix, NewFactoryMyAngularSuffix } from '../factory-my-angular-suffix.model';

export type PartialUpdateFactoryMyAngularSuffix = Partial<IFactoryMyAngularSuffix> & Pick<IFactoryMyAngularSuffix, 'id'>;

export type EntityResponseType = HttpResponse<IFactoryMyAngularSuffix>;
export type EntityArrayResponseType = HttpResponse<IFactoryMyAngularSuffix[]>;

@Injectable({ providedIn: 'root' })
export class FactoryMyAngularSuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/factories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(factory: NewFactoryMyAngularSuffix): Observable<EntityResponseType> {
    return this.http.post<IFactoryMyAngularSuffix>(this.resourceUrl, factory, { observe: 'response' });
  }

  update(factory: IFactoryMyAngularSuffix): Observable<EntityResponseType> {
    return this.http.put<IFactoryMyAngularSuffix>(`${this.resourceUrl}/${this.getFactoryMyAngularSuffixIdentifier(factory)}`, factory, {
      observe: 'response',
    });
  }

  partialUpdate(factory: PartialUpdateFactoryMyAngularSuffix): Observable<EntityResponseType> {
    return this.http.patch<IFactoryMyAngularSuffix>(`${this.resourceUrl}/${this.getFactoryMyAngularSuffixIdentifier(factory)}`, factory, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFactoryMyAngularSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFactoryMyAngularSuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFactoryMyAngularSuffixIdentifier(factory: Pick<IFactoryMyAngularSuffix, 'id'>): number {
    return factory.id;
  }

  compareFactoryMyAngularSuffix(o1: Pick<IFactoryMyAngularSuffix, 'id'> | null, o2: Pick<IFactoryMyAngularSuffix, 'id'> | null): boolean {
    return o1 && o2 ? this.getFactoryMyAngularSuffixIdentifier(o1) === this.getFactoryMyAngularSuffixIdentifier(o2) : o1 === o2;
  }

  addFactoryMyAngularSuffixToCollectionIfMissing<Type extends Pick<IFactoryMyAngularSuffix, 'id'>>(
    factoryCollection: Type[],
    ...factoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const factories: Type[] = factoriesToCheck.filter(isPresent);
    if (factories.length > 0) {
      const factoryCollectionIdentifiers = factoryCollection.map(factoryItem => this.getFactoryMyAngularSuffixIdentifier(factoryItem)!);
      const factoriesToAdd = factories.filter(factoryItem => {
        const factoryIdentifier = this.getFactoryMyAngularSuffixIdentifier(factoryItem);
        if (factoryCollectionIdentifiers.includes(factoryIdentifier)) {
          return false;
        }
        factoryCollectionIdentifiers.push(factoryIdentifier);
        return true;
      });
      return [...factoriesToAdd, ...factoryCollection];
    }
    return factoryCollection;
  }
}
