import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { WorkerMyAngularSuffixComponent } from '../list/worker-my-angular-suffix.component';
import { WorkerMyAngularSuffixDetailComponent } from '../detail/worker-my-angular-suffix-detail.component';
import { WorkerMyAngularSuffixUpdateComponent } from '../update/worker-my-angular-suffix-update.component';
import { WorkerMyAngularSuffixRoutingResolveService } from './worker-my-angular-suffix-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const workerRoute: Routes = [
  {
    path: '',
    component: WorkerMyAngularSuffixComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WorkerMyAngularSuffixDetailComponent,
    resolve: {
      worker: WorkerMyAngularSuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WorkerMyAngularSuffixUpdateComponent,
    resolve: {
      worker: WorkerMyAngularSuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WorkerMyAngularSuffixUpdateComponent,
    resolve: {
      worker: WorkerMyAngularSuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(workerRoute)],
  exports: [RouterModule],
})
export class WorkerMyAngularSuffixRoutingModule {}
