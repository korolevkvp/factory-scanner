import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { WorkerMyAngularSuffixComponent } from './list/worker-my-angular-suffix.component';
import { WorkerMyAngularSuffixDetailComponent } from './detail/worker-my-angular-suffix-detail.component';
import { WorkerMyAngularSuffixUpdateComponent } from './update/worker-my-angular-suffix-update.component';
import { WorkerMyAngularSuffixDeleteDialogComponent } from './delete/worker-my-angular-suffix-delete-dialog.component';
import { WorkerMyAngularSuffixRoutingModule } from './route/worker-my-angular-suffix-routing.module';

@NgModule({
  imports: [SharedModule, WorkerMyAngularSuffixRoutingModule],
  declarations: [
    WorkerMyAngularSuffixComponent,
    WorkerMyAngularSuffixDetailComponent,
    WorkerMyAngularSuffixUpdateComponent,
    WorkerMyAngularSuffixDeleteDialogComponent,
  ],
})
export class WorkerMyAngularSuffixModule {}
