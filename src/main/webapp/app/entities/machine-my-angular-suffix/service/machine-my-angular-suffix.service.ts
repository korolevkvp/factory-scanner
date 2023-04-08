import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMachineMyAngularSuffix, NewMachineMyAngularSuffix } from '../machine-my-angular-suffix.model';

export type PartialUpdateMachineMyAngularSuffix = Partial<IMachineMyAngularSuffix> & Pick<IMachineMyAngularSuffix, 'id'>;

export type EntityResponseType = HttpResponse<IMachineMyAngularSuffix>;
export type EntityArrayResponseType = HttpResponse<IMachineMyAngularSuffix[]>;

@Injectable({ providedIn: 'root' })
export class MachineMyAngularSuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/machines');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(machine: NewMachineMyAngularSuffix): Observable<EntityResponseType> {
    return this.http.post<IMachineMyAngularSuffix>(this.resourceUrl, machine, { observe: 'response' });
  }

  update(machine: IMachineMyAngularSuffix): Observable<EntityResponseType> {
    return this.http.put<IMachineMyAngularSuffix>(`${this.resourceUrl}/${this.getMachineMyAngularSuffixIdentifier(machine)}`, machine, {
      observe: 'response',
    });
  }

  partialUpdate(machine: PartialUpdateMachineMyAngularSuffix): Observable<EntityResponseType> {
    return this.http.patch<IMachineMyAngularSuffix>(`${this.resourceUrl}/${this.getMachineMyAngularSuffixIdentifier(machine)}`, machine, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMachineMyAngularSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMachineMyAngularSuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMachineMyAngularSuffixIdentifier(machine: Pick<IMachineMyAngularSuffix, 'id'>): number {
    return machine.id;
  }

  compareMachineMyAngularSuffix(o1: Pick<IMachineMyAngularSuffix, 'id'> | null, o2: Pick<IMachineMyAngularSuffix, 'id'> | null): boolean {
    return o1 && o2 ? this.getMachineMyAngularSuffixIdentifier(o1) === this.getMachineMyAngularSuffixIdentifier(o2) : o1 === o2;
  }

  addMachineMyAngularSuffixToCollectionIfMissing<Type extends Pick<IMachineMyAngularSuffix, 'id'>>(
    machineCollection: Type[],
    ...machinesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const machines: Type[] = machinesToCheck.filter(isPresent);
    if (machines.length > 0) {
      const machineCollectionIdentifiers = machineCollection.map(machineItem => this.getMachineMyAngularSuffixIdentifier(machineItem)!);
      const machinesToAdd = machines.filter(machineItem => {
        const machineIdentifier = this.getMachineMyAngularSuffixIdentifier(machineItem);
        if (machineCollectionIdentifiers.includes(machineIdentifier)) {
          return false;
        }
        machineCollectionIdentifiers.push(machineIdentifier);
        return true;
      });
      return [...machinesToAdd, ...machineCollection];
    }
    return machineCollection;
  }
}
