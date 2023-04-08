import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWorkerMyAngularSuffix } from '../worker-my-angular-suffix.model';
import { WorkerMyAngularSuffixService } from '../service/worker-my-angular-suffix.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './worker-my-angular-suffix-delete-dialog.component.html',
})
export class WorkerMyAngularSuffixDeleteDialogComponent {
  worker?: IWorkerMyAngularSuffix;

  constructor(protected workerService: WorkerMyAngularSuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.workerService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
