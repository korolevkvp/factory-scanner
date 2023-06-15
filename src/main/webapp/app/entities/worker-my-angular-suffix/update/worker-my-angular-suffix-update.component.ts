import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { WorkerMyAngularSuffixFormService, WorkerMyAngularSuffixFormGroup } from './worker-my-angular-suffix-form.service';
import { IWorkerMyAngularSuffix } from '../worker-my-angular-suffix.model';
import { WorkerMyAngularSuffixService } from '../service/worker-my-angular-suffix.service';
import { IJobMyAngularSuffix } from 'app/entities/job-my-angular-suffix/job-my-angular-suffix.model';
import { JobMyAngularSuffixService } from 'app/entities/job-my-angular-suffix/service/job-my-angular-suffix.service';
import { IFactoryMyAngularSuffix } from 'app/entities/factory-my-angular-suffix/factory-my-angular-suffix.model';
import { FactoryMyAngularSuffixService } from 'app/entities/factory-my-angular-suffix/service/factory-my-angular-suffix.service';

@Component({
  selector: 'jhi-worker-my-angular-suffix-update',
  templateUrl: './worker-my-angular-suffix-update.component.html',
})
export class WorkerMyAngularSuffixUpdateComponent implements OnInit {
  isSaving = false;
  worker: IWorkerMyAngularSuffix | null = null;

  jobsSharedCollection: IJobMyAngularSuffix[] = [];
  factoriesSharedCollection: IFactoryMyAngularSuffix[] = [];

  editForm: WorkerMyAngularSuffixFormGroup = this.workerFormService.createWorkerMyAngularSuffixFormGroup();

  constructor(
    protected workerService: WorkerMyAngularSuffixService,
    protected workerFormService: WorkerMyAngularSuffixFormService,
    protected jobService: JobMyAngularSuffixService,
    protected factoryService: FactoryMyAngularSuffixService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareJobMyAngularSuffix = (o1: IJobMyAngularSuffix | null, o2: IJobMyAngularSuffix | null): boolean =>
    this.jobService.compareJobMyAngularSuffix(o1, o2);

  compareFactoryMyAngularSuffix = (o1: IFactoryMyAngularSuffix | null, o2: IFactoryMyAngularSuffix | null): boolean =>
    this.factoryService.compareFactoryMyAngularSuffix(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ worker }) => {
      this.worker = worker;
      if (worker) {
        this.updateForm(worker);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const worker = this.workerFormService.getWorkerMyAngularSuffix(this.editForm);
    if (worker.id !== null) {
      this.subscribeToSaveResponse(this.workerService.update(worker));
    } else {
      this.subscribeToSaveResponse(this.workerService.create(worker));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkerMyAngularSuffix>>): void {
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

  protected updateForm(worker: IWorkerMyAngularSuffix): void {
    this.worker = worker;
    this.workerFormService.resetForm(this.editForm, worker);

    this.jobsSharedCollection = this.jobService.addJobMyAngularSuffixToCollectionIfMissing<IJobMyAngularSuffix>(
      this.jobsSharedCollection,
      worker.job
    );
    this.factoriesSharedCollection = this.factoryService.addFactoryMyAngularSuffixToCollectionIfMissing<IFactoryMyAngularSuffix>(
      this.factoriesSharedCollection,
      worker.factory
    );
  }

  protected loadRelationshipsOptions(): void {
    this.jobService
      .query()
      .pipe(map((res: HttpResponse<IJobMyAngularSuffix[]>) => res.body ?? []))
      .pipe(
        map((jobs: IJobMyAngularSuffix[]) =>
          this.jobService.addJobMyAngularSuffixToCollectionIfMissing<IJobMyAngularSuffix>(jobs, this.worker?.job)
        )
      )
      .subscribe((jobs: IJobMyAngularSuffix[]) => (this.jobsSharedCollection = jobs));

    this.factoryService
      .query()
      .pipe(map((res: HttpResponse<IFactoryMyAngularSuffix[]>) => res.body ?? []))
      .pipe(
        map((factories: IFactoryMyAngularSuffix[]) =>
          this.factoryService.addFactoryMyAngularSuffixToCollectionIfMissing<IFactoryMyAngularSuffix>(factories, this.worker?.factory)
        )
      )
      .subscribe((factories: IFactoryMyAngularSuffix[]) => (this.factoriesSharedCollection = factories));
  }
}
