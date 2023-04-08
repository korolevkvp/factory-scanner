import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { JobMyAngularSuffixComponent } from '../list/job-my-angular-suffix.component';
import { JobMyAngularSuffixDetailComponent } from '../detail/job-my-angular-suffix-detail.component';
import { JobMyAngularSuffixUpdateComponent } from '../update/job-my-angular-suffix-update.component';
import { JobMyAngularSuffixRoutingResolveService } from './job-my-angular-suffix-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const jobRoute: Routes = [
  {
    path: '',
    component: JobMyAngularSuffixComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: JobMyAngularSuffixDetailComponent,
    resolve: {
      job: JobMyAngularSuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: JobMyAngularSuffixUpdateComponent,
    resolve: {
      job: JobMyAngularSuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: JobMyAngularSuffixUpdateComponent,
    resolve: {
      job: JobMyAngularSuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(jobRoute)],
  exports: [RouterModule],
})
export class JobMyAngularSuffixRoutingModule {}
