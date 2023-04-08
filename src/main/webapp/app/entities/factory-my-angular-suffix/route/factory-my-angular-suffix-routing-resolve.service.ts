import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFactoryMyAngularSuffix } from '../factory-my-angular-suffix.model';
import { FactoryMyAngularSuffixService } from '../service/factory-my-angular-suffix.service';

@Injectable({ providedIn: 'root' })
export class FactoryMyAngularSuffixRoutingResolveService implements Resolve<IFactoryMyAngularSuffix | null> {
  constructor(protected service: FactoryMyAngularSuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFactoryMyAngularSuffix | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((factory: HttpResponse<IFactoryMyAngularSuffix>) => {
          if (factory.body) {
            return of(factory.body);
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
