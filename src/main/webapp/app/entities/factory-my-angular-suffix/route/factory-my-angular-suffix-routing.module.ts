import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FactoryMyAngularSuffixComponent } from '../list/factory-my-angular-suffix.component';
import { FactoryMyAngularSuffixDetailComponent } from '../detail/factory-my-angular-suffix-detail.component';
import { FactoryMyAngularSuffixUpdateComponent } from '../update/factory-my-angular-suffix-update.component';
import { FactoryMyAngularSuffixRoutingResolveService } from './factory-my-angular-suffix-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const factoryRoute: Routes = [
  {
    path: '',
    component: FactoryMyAngularSuffixComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FactoryMyAngularSuffixDetailComponent,
    resolve: {
      factory: FactoryMyAngularSuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FactoryMyAngularSuffixUpdateComponent,
    resolve: {
      factory: FactoryMyAngularSuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FactoryMyAngularSuffixUpdateComponent,
    resolve: {
      factory: FactoryMyAngularSuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(factoryRoute)],
  exports: [RouterModule],
})
export class FactoryMyAngularSuffixRoutingModule {}
