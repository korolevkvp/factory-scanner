import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMachineMyAngularSuffix } from '../machine-my-angular-suffix.model';
import { MachineMyAngularSuffixService } from '../service/machine-my-angular-suffix.service';

@Injectable({ providedIn: 'root' })
export class MachineMyAngularSuffixRoutingResolveService implements Resolve<IMachineMyAngularSuffix | null> {
  constructor(protected service: MachineMyAngularSuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMachineMyAngularSuffix | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((machine: HttpResponse<IMachineMyAngularSuffix>) => {
          if (machine.body) {
            return of(machine.body);
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
