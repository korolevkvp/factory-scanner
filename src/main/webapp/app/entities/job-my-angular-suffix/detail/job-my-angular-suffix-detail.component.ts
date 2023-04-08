import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobMyAngularSuffix } from '../job-my-angular-suffix.model';

@Component({
  selector: 'jhi-job-my-angular-suffix-detail',
  templateUrl: './job-my-angular-suffix-detail.component.html',
})
export class JobMyAngularSuffixDetailComponent implements OnInit {
  job: IJobMyAngularSuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ job }) => {
      this.job = job;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
