import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFactoryMyAngularSuffix } from '../factory-my-angular-suffix.model';
import { FactoryMyAngularSuffixService } from '../service/factory-my-angular-suffix.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './factory-my-angular-suffix-delete-dialog.component.html',
})
export class FactoryMyAngularSuffixDeleteDialogComponent {
  factory?: IFactoryMyAngularSuffix;

  constructor(protected factoryService: FactoryMyAngularSuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.factoryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
