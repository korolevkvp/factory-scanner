import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IJobMyAngularSuffix } from '../job-my-angular-suffix.model';
import { JobMyAngularSuffixService } from '../service/job-my-angular-suffix.service';

@Injectable({ providedIn: 'root' })
export class JobMyAngularSuffixRoutingResolveService implements Resolve<IJobMyAngularSuffix | null> {
  constructor(protected service: JobMyAngularSuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJobMyAngularSuffix | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((job: HttpResponse<IJobMyAngularSuffix>) => {
          if (job.body) {
            return of(job.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
