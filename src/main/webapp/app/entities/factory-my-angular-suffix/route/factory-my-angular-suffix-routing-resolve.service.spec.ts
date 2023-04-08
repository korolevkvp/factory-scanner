import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IFactoryMyAngularSuffix } from '../factory-my-angular-suffix.model';
import { FactoryMyAngularSuffixService } from '../service/factory-my-angular-suffix.service';

import { FactoryMyAngularSuffixRoutingResolveService } from './factory-my-angular-suffix-routing-resolve.service';

describe('FactoryMyAngularSuffix routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: FactoryMyAngularSuffixRoutingResolveService;
  let service: FactoryMyAngularSuffixService;
  let resultFactoryMyAngularSuffix: IFactoryMyAngularSuffix | null | undefined;

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
    routingResolveService = TestBed.inject(FactoryMyAngularSuffixRoutingResolveService);
    service = TestBed.inject(FactoryMyAngularSuffixService);
    resultFactoryMyAngularSuffix = undefined;
  });

  describe('resolve', () => {
    it('should return IFactoryMyAngularSuffix returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFactoryMyAngularSuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultFactoryMyAngularSuffix).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFactoryMyAngularSuffix = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultFactoryMyAngularSuffix).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IFactoryMyAngularSuffix>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFactoryMyAngularSuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultFactoryMyAngularSuffix).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
