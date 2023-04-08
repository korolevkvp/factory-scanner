import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { MachineMyAngularSuffixFormService, MachineMyAngularSuffixFormGroup } from './machine-my-angular-suffix-form.service';
import { IMachineMyAngularSuffix } from '../machine-my-angular-suffix.model';
import { MachineMyAngularSuffixService } from '../service/machine-my-angular-suffix.service';
import { IFactoryMyAngularSuffix } from 'app/entities/factory-my-angular-suffix/factory-my-angular-suffix.model';
import { FactoryMyAngularSuffixService } from 'app/entities/factory-my-angular-suffix/service/factory-my-angular-suffix.service';
import { MachineType } from 'app/entities/enumerations/machine-type.model';

@Component({
  selector: 'jhi-machine-my-angular-suffix-update',
  templateUrl: './machine-my-angular-suffix-update.component.html',
})
export class MachineMyAngularSuffixUpdateComponent implements OnInit {
  isSaving = false;
  machine: IMachineMyAngularSuffix | null = null;
  machineTypeValues = Object.keys(MachineType);

  factoriesSharedCollection: IFactoryMyAngularSuffix[] = [];

  editForm: MachineMyAngularSuffixFormGroup = this.machineFormService.createMachineMyAngularSuffixFormGroup();

  constructor(
    protected machineService: MachineMyAngularSuffixService,
    protected machineFormService: MachineMyAngularSuffixFormService,
    protected factoryService: FactoryMyAngularSuffixService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareFactoryMyAngularSuffix = (o1: IFactoryMyAngularSuffix | null, o2: IFactoryMyAngularSuffix | null): boolean =>
    this.factoryService.compareFactoryMyAngularSuffix(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ machine }) => {
      this.machine = machine;
      if (machine) {
        this.updateForm(machine);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const machine = this.machineFormService.getMachineMyAngularSuffix(this.editForm);
    if (machine.id !== null) {
      this.subscribeToSaveResponse(this.machineService.update(machine));
    } else {
      this.subscribeToSaveResponse(this.machineService.create(machine));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMachineMyAngularSuffix>>): void {
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

  protected updateForm(machine: IMachineMyAngularSuffix): void {
    this.machine = machine;
    this.machineFormService.resetForm(this.editForm, machine);

    this.factoriesSharedCollection = this.factoryService.addFactoryMyAngularSuffixToCollectionIfMissing<IFactoryMyAngularSuffix>(
      this.factoriesSharedCollection,
      machine.factory
    );
  }

  protected loadRelationshipsOptions(): void {
    this.factoryService
      .query()
      .pipe(map((res: HttpResponse<IFactoryMyAngularSuffix[]>) => res.body ?? []))
      .pipe(
        map((factories: IFactoryMyAngularSuffix[]) =>
          this.factoryService.addFactoryMyAngularSuffixToCollectionIfMissing<IFactoryMyAngularSuffix>(factories, this.machine?.factory)
        )
      )
      .subscribe((factories: IFactoryMyAngularSuffix[]) => (this.factoriesSharedCollection = factories));
  }
}
