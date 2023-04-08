import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWorkerMyAngularSuffix } from '../worker-my-angular-suffix.model';
import { WorkerMyAngularSuffixService } from '../service/worker-my-angular-suffix.service';

@Injectable({ providedIn: 'root' })
export class WorkerMyAngularSuffixRoutingResolveService implements Resolve<IWorkerMyAngularSuffix | null> {
  constructor(protected service: WorkerMyAngularSuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWorkerMyAngularSuffix | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((worker: HttpResponse<IWorkerMyAngularSuffix>) => {
          if (worker.body) {
            return of(worker.body);
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
