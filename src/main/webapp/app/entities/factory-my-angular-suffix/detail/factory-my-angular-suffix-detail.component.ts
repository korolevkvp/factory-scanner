import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFactoryMyAngularSuffix } from '../factory-my-angular-suffix.model';

@Component({
  selector: 'jhi-factory-my-angular-suffix-detail',
  templateUrl: './factory-my-angular-suffix-detail.component.html',
})
export class FactoryMyAngularSuffixDetailComponent implements OnInit {
  factory: IFactoryMyAngularSuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ factory }) => {
      this.factory = factory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
