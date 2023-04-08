import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWorkerMyAngularSuffix } from '../worker-my-angular-suffix.model';

@Component({
  selector: 'jhi-worker-my-angular-suffix-detail',
  templateUrl: './worker-my-angular-suffix-detail.component.html',
})
export class WorkerMyAngularSuffixDetailComponent implements OnInit {
  worker: IWorkerMyAngularSuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ worker }) => {
      this.worker = worker;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
