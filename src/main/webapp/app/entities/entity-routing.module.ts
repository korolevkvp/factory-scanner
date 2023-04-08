import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'worker-my-angular-suffix',
        data: { pageTitle: 'factoryScannerApp.worker.home.title' },
        loadChildren: () => import('./worker-my-angular-suffix/worker-my-angular-suffix.module').then(m => m.WorkerMyAngularSuffixModule),
      },
      {
        path: 'machine-my-angular-suffix',
        data: { pageTitle: 'factoryScannerApp.machine.home.title' },
        loadChildren: () =>
          import('./machine-my-angular-suffix/machine-my-angular-suffix.module').then(m => m.MachineMyAngularSuffixModule),
      },
      {
        path: 'factory-my-angular-suffix',
        data: { pageTitle: 'factoryScannerApp.factory.home.title' },
        loadChildren: () =>
          import('./factory-my-angular-suffix/factory-my-angular-suffix.module').then(m => m.FactoryMyAngularSuffixModule),
      },
      {
        path: 'job-my-angular-suffix',
        data: { pageTitle: 'factoryScannerApp.job.home.title' },
        loadChildren: () => import('./job-my-angular-suffix/job-my-angular-suffix.module').then(m => m.JobMyAngularSuffixModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
