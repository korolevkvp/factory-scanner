import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMachineMyAngularSuffix } from '../machine-my-angular-suffix.model';
import { MachineMyAngularSuffixService } from '../service/machine-my-angular-suffix.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './machine-my-angular-suffix-delete-dialog.component.html',
})
export class MachineMyAngularSuffixDeleteDialogComponent {
  machine?: IMachineMyAngularSuffix;

  constructor(protected machineService: MachineMyAngularSuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.machineService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
