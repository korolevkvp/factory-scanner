import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MachineMyAngularSuffixComponent } from '../list/machine-my-angular-suffix.component';
import { MachineMyAngularSuffixDetailComponent } from '../detail/machine-my-angular-suffix-detail.component';
import { MachineMyAngularSuffixUpdateComponent } from '../update/machine-my-angular-suffix-update.component';
import { MachineMyAngularSuffixRoutingResolveService } from './machine-my-angular-suffix-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const machineRoute: Routes = [
  {
    path: '',
    component: MachineMyAngularSuffixComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MachineMyAngularSuffixDetailComponent,
    resolve: {
      machine: MachineMyAngularSuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MachineMyAngularSuffixUpdateComponent,
    resolve: {
      machine: MachineMyAngularSuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MachineMyAngularSuffixUpdateComponent,
    resolve: {
      machine: MachineMyAngularSuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(machineRoute)],
  exports: [RouterModule],
})
export class MachineMyAngularSuffixRoutingModule {}
