import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MachineMyAngularSuffixComponent } from './list/machine-my-angular-suffix.component';
import { MachineMyAngularSuffixDetailComponent } from './detail/machine-my-angular-suffix-detail.component';
import { MachineMyAngularSuffixUpdateComponent } from './update/machine-my-angular-suffix-update.component';
import { MachineMyAngularSuffixDeleteDialogComponent } from './delete/machine-my-angular-suffix-delete-dialog.component';
import { MachineMyAngularSuffixRoutingModule } from './route/machine-my-angular-suffix-routing.module';

@NgModule({
  imports: [SharedModule, MachineMyAngularSuffixRoutingModule],
  declarations: [
    MachineMyAngularSuffixComponent,
    MachineMyAngularSuffixDetailComponent,
    MachineMyAngularSuffixUpdateComponent,
    MachineMyAngularSuffixDeleteDialogComponent,
  ],
})
export class MachineMyAngularSuffixModule {}
