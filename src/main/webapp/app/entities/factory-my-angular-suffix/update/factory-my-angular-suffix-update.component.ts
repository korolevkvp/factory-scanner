import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FactoryMyAngularSuffixFormService, FactoryMyAngularSuffixFormGroup } from './factory-my-angular-suffix-form.service';
import { IFactoryMyAngularSuffix } from '../factory-my-angular-suffix.model';
import { FactoryMyAngularSuffixService } from '../service/factory-my-angular-suffix.service';

@Component({
  selector: 'jhi-factory-my-angular-suffix-update',
  templateUrl: './factory-my-angular-suffix-update.component.html',
})
export class FactoryMyAngularSuffixUpdateComponent implements OnInit {
  isSaving = false;
  factory: IFactoryMyAngularSuffix | null = null;

  editForm: FactoryMyAngularSuffixFormGroup = this.factoryFormService.createFactoryMyAngularSuffixFormGroup();

  constructor(
    protected factoryService: FactoryMyAngularSuffixService,
    protected factoryFormService: FactoryMyAngularSuffixFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ factory }) => {
      this.factory = factory;
      if (factory) {
        this.updateForm(factory);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const factory = this.factoryFormService.getFactoryMyAngularSuffix(this.editForm);
    if (factory.id !== null) {
      this.subscribeToSaveResponse(this.factoryService.update(factory));
    } else {
      this.subscribeToSaveResponse(this.factoryService.create(factory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFactoryMyAngularSuffix>>): void {
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

  protected updateForm(factory: IFactoryMyAngularSuffix): void {
    this.factory = factory;
    this.factoryFormService.resetForm(this.editForm, factory);
  }
}
