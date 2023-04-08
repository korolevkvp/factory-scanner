import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IJobMyAngularSuffix, NewJobMyAngularSuffix } from '../job-my-angular-suffix.model';

export type PartialUpdateJobMyAngularSuffix = Partial<IJobMyAngularSuffix> & Pick<IJobMyAngularSuffix, 'id'>;

export type EntityResponseType = HttpResponse<IJobMyAngularSuffix>;
export type EntityArrayResponseType = HttpResponse<IJobMyAngularSuffix[]>;

@Injectable({ providedIn: 'root' })
export class JobMyAngularSuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/jobs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(job: NewJobMyAngularSuffix): Observable<EntityResponseType> {
    return this.http.post<IJobMyAngularSuffix>(this.resourceUrl, job, { observe: 'response' });
  }

  update(job: IJobMyAngularSuffix): Observable<EntityResponseType> {
    return this.http.put<IJobMyAngularSuffix>(`${this.resourceUrl}/${this.getJobMyAngularSuffixIdentifier(job)}`, job, {
      observe: 'response',
    });
  }

  partialUpdate(job: PartialUpdateJobMyAngularSuffix): Observable<EntityResponseType> {
    return this.http.patch<IJobMyAngularSuffix>(`${this.resourceUrl}/${this.getJobMyAngularSuffixIdentifier(job)}`, job, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IJobMyAngularSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJobMyAngularSuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getJobMyAngularSuffixIdentifier(job: Pick<IJobMyAngularSuffix, 'id'>): number {
    return job.id;
  }

  compareJobMyAngularSuffix(o1: Pick<IJobMyAngularSuffix, 'id'> | null, o2: Pick<IJobMyAngularSuffix, 'id'> | null): boolean {
    return o1 && o2 ? this.getJobMyAngularSuffixIdentifier(o1) === this.getJobMyAngularSuffixIdentifier(o2) : o1 === o2;
  }

  addJobMyAngularSuffixToCollectionIfMissing<Type extends Pick<IJobMyAngularSuffix, 'id'>>(
    jobCollection: Type[],
    ...jobsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const jobs: Type[] = jobsToCheck.filter(isPresent);
    if (jobs.length > 0) {
      const jobCollectionIdentifiers = jobCollection.map(jobItem => this.getJobMyAngularSuffixIdentifier(jobItem)!);
      const jobsToAdd = jobs.filter(jobItem => {
        const jobIdentifier = this.getJobMyAngularSuffixIdentifier(jobItem);
        if (jobCollectionIdentifiers.includes(jobIdentifier)) {
          return false;
        }
        jobCollectionIdentifiers.push(jobIdentifier);
        return true;
      });
      return [...jobsToAdd, ...jobCollection];
    }
    return jobCollection;
  }
}
