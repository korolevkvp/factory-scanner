import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWorkerMyAngularSuffix, NewWorkerMyAngularSuffix } from '../worker-my-angular-suffix.model';

export type PartialUpdateWorkerMyAngularSuffix = Partial<IWorkerMyAngularSuffix> & Pick<IWorkerMyAngularSuffix, 'id'>;

type RestOf<T extends IWorkerMyAngularSuffix | NewWorkerMyAngularSuffix> = Omit<T, 'hireDate'> & {
  hireDate?: string | null;
};

export type RestWorkerMyAngularSuffix = RestOf<IWorkerMyAngularSuffix>;

export type NewRestWorkerMyAngularSuffix = RestOf<NewWorkerMyAngularSuffix>;

export type PartialUpdateRestWorkerMyAngularSuffix = RestOf<PartialUpdateWorkerMyAngularSuffix>;

export type EntityResponseType = HttpResponse<IWorkerMyAngularSuffix>;
export type EntityArrayResponseType = HttpResponse<IWorkerMyAngularSuffix[]>;

@Injectable({ providedIn: 'root' })
export class WorkerMyAngularSuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/workers');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(worker: NewWorkerMyAngularSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(worker);
    return this.http
      .post<RestWorkerMyAngularSuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(worker: IWorkerMyAngularSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(worker);
    return this.http
      .put<RestWorkerMyAngularSuffix>(`${this.resourceUrl}/${this.getWorkerMyAngularSuffixIdentifier(worker)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(worker: PartialUpdateWorkerMyAngularSuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(worker);
    return this.http
      .patch<RestWorkerMyAngularSuffix>(`${this.resourceUrl}/${this.getWorkerMyAngularSuffixIdentifier(worker)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestWorkerMyAngularSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestWorkerMyAngularSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getWorkerMyAngularSuffixIdentifier(worker: Pick<IWorkerMyAngularSuffix, 'id'>): number {
    return worker.id;
  }

  compareWorkerMyAngularSuffix(o1: Pick<IWorkerMyAngularSuffix, 'id'> | null, o2: Pick<IWorkerMyAngularSuffix, 'id'> | null): boolean {
    return o1 && o2 ? this.getWorkerMyAngularSuffixIdentifier(o1) === this.getWorkerMyAngularSuffixIdentifier(o2) : o1 === o2;
  }

  addWorkerMyAngularSuffixToCollectionIfMissing<Type extends Pick<IWorkerMyAngularSuffix, 'id'>>(
    workerCollection: Type[],
    ...workersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const workers: Type[] = workersToCheck.filter(isPresent);
    if (workers.length > 0) {
      const workerCollectionIdentifiers = workerCollection.map(workerItem => this.getWorkerMyAngularSuffixIdentifier(workerItem)!);
      const workersToAdd = workers.filter(workerItem => {
        const workerIdentifier = this.getWorkerMyAngularSuffixIdentifier(workerItem);
        if (workerCollectionIdentifiers.includes(workerIdentifier)) {
          return false;
        }
        workerCollectionIdentifiers.push(workerIdentifier);
        return true;
      });
      return [...workersToAdd, ...workerCollection];
    }
    return workerCollection;
  }

  protected convertDateFromClient<T extends IWorkerMyAngularSuffix | NewWorkerMyAngularSuffix | PartialUpdateWorkerMyAngularSuffix>(
    worker: T
  ): RestOf<T> {
    return {
      ...worker,
      hireDate: worker.hireDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restWorkerMyAngularSuffix: RestWorkerMyAngularSuffix): IWorkerMyAngularSuffix {
    return {
      ...restWorkerMyAngularSuffix,
      hireDate: restWorkerMyAngularSuffix.hireDate ? dayjs(restWorkerMyAngularSuffix.hireDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestWorkerMyAngularSuffix>): HttpResponse<IWorkerMyAngularSuffix> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestWorkerMyAngularSuffix[]>): HttpResponse<IWorkerMyAngularSuffix[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
