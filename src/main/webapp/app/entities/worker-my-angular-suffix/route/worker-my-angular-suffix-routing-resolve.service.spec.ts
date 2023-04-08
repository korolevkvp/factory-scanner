import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IWorkerMyAngularSuffix } from '../worker-my-angular-suffix.model';
import { WorkerMyAngularSuffixService } from '../service/worker-my-angular-suffix.service';

import { WorkerMyAngularSuffixRoutingResolveService } from './worker-my-angular-suffix-routing-resolve.service';

describe('WorkerMyAngularSuffix routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: WorkerMyAngularSuffixRoutingResolveService;
  let service: WorkerMyAngularSuffixService;
  let resultWorkerMyAngularSuffix: IWorkerMyAngularSuffix | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(WorkerMyAngularSuffixRoutingResolveService);
    service = TestBed.inject(WorkerMyAngularSuffixService);
    resultWorkerMyAngularSuffix = undefined;
  });

  describe('resolve', () => {
    it('should return IWorkerMyAngularSuffix returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultWorkerMyAngularSuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultWorkerMyAngularSuffix).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultWorkerMyAngularSuffix = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultWorkerMyAngularSuffix).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IWorkerMyAngularSuffix>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultWorkerMyAngularSuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultWorkerMyAngularSuffix).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
