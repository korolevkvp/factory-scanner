import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FactoryMyAngularSuffixComponent } from './list/factory-my-angular-suffix.component';
import { FactoryMyAngularSuffixDetailComponent } from './detail/factory-my-angular-suffix-detail.component';
import { FactoryMyAngularSuffixUpdateComponent } from './update/factory-my-angular-suffix-update.component';
import { FactoryMyAngularSuffixDeleteDialogComponent } from './delete/factory-my-angular-suffix-delete-dialog.component';
import { FactoryMyAngularSuffixRoutingModule } from './route/factory-my-angular-suffix-routing.module';

@NgModule({
  imports: [SharedModule, FactoryMyAngularSuffixRoutingModule],
  declarations: [
    FactoryMyAngularSuffixComponent,
    FactoryMyAngularSuffixDetailComponent,
    FactoryMyAngularSuffixUpdateComponent,
    FactoryMyAngularSuffixDeleteDialogComponent,
  ],
})
export class FactoryMyAngularSuffixModule {}
