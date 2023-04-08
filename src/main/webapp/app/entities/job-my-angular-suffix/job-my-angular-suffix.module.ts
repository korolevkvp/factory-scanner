import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { JobMyAngularSuffixComponent } from './list/job-my-angular-suffix.component';
import { JobMyAngularSuffixDetailComponent } from './detail/job-my-angular-suffix-detail.component';
import { JobMyAngularSuffixUpdateComponent } from './update/job-my-angular-suffix-update.component';
import { JobMyAngularSuffixDeleteDialogComponent } from './delete/job-my-angular-suffix-delete-dialog.component';
import { JobMyAngularSuffixRoutingModule } from './route/job-my-angular-suffix-routing.module';

@NgModule({
  imports: [SharedModule, JobMyAngularSuffixRoutingModule],
  declarations: [
    JobMyAngularSuffixComponent,
    JobMyAngularSuffixDetailComponent,
    JobMyAngularSuffixUpdateComponent,
    JobMyAngularSuffixDeleteDialogComponent,
  ],
})
export class JobMyAngularSuffixModule {}
