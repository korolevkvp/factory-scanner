import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { JobMyAngularSuffixFormService, JobMyAngularSuffixFormGroup } from './job-my-angular-suffix-form.service';
import { IJobMyAngularSuffix } from '../job-my-angular-suffix.model';
import { JobMyAngularSuffixService } from '../service/job-my-angular-suffix.service';
import { JobType } from 'app/entities/enumerations/job-type.model';

@Component({
  selector: 'jhi-job-my-angular-suffix-update',
  templateUrl: './job-my-angular-suffix-update.component.html',
})
export class JobMyAngularSuffixUpdateComponent implements OnInit {
  isSaving = false;
  job: IJobMyAngularSuffix | null = null;
  jobTypeValues = Object.keys(JobType);

  editForm: JobMyAngularSuffixFormGroup = this.jobFormService.createJobMyAngularSuffixFormGroup();

  constructor(
    protected jobService: JobMyAngularSuffixService,
    protected jobFormService: JobMyAngularSuffixFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ job }) => {
      this.job = job;
      if (job) {
        this.updateForm(job);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const job = this.jobFormService.getJobMyAngularSuffix(this.editForm);
    if (job.id !== null) {
      this.subscribeToSaveResponse(this.jobService.update(job));
    } else {
      this.subscribeToSaveResponse(this.jobService.create(job));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobMyAngularSuffix>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(job: IJobMyAngularSuffix): void {
    this.job = job;
    this.jobFormService.resetForm(this.editForm, job);
  }
}
