import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMachineMyAngularSuffix } from '../machine-my-angular-suffix.model';

@Component({
  selector: 'jhi-machine-my-angular-suffix-detail',
  templateUrl: './machine-my-angular-suffix-detail.component.html',
})
export class MachineMyAngularSuffixDetailComponent implements OnInit {
  machine: IMachineMyAngularSuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ machine }) => {
      this.machine = machine;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
