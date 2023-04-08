import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IJobMyAngularSuffix } from '../job-my-angular-suffix.model';
import { JobMyAngularSuffixService } from '../service/job-my-angular-suffix.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './job-my-angular-suffix-delete-dialog.component.html',
})
export class JobMyAngularSuffixDeleteDialogComponent {
  job?: IJobMyAngularSuffix;

  constructor(protected jobService: JobMyAngularSuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jobService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
