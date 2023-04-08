import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IWorkerMyAngularSuffix } from '../worker-my-angular-suffix.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../worker-my-angular-suffix.test-samples';

import { WorkerMyAngularSuffixService, RestWorkerMyAngularSuffix } from './worker-my-angular-suffix.service';

const requireRestSample: RestWorkerMyAngularSuffix = {
  ...sampleWithRequiredData,
  hireDate: sampleWithRequiredData.hireDate?.format(DATE_FORMAT),
};

describe('WorkerMyAngularSuffix Service', () => {
  let service: WorkerMyAngularSuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: IWorkerMyAngularSuffix | IWorkerMyAngularSuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WorkerMyAngularSuffixService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a WorkerMyAngularSuffix', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const worker = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(worker).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WorkerMyAngularSuffix', () => {
      const worker = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(worker).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WorkerMyAngularSuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WorkerMyAngularSuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a WorkerMyAngularSuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addWorkerMyAngularSuffixToCollectionIfMissing', () => {
      it('should add a WorkerMyAngularSuffix to an empty array', () => {
        const worker: IWorkerMyAngularSuffix = sampleWithRequiredData;
        expectedResult = service.addWorkerMyAngularSuffixToCollectionIfMissing([], worker);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(worker);
      });

      it('should not add a WorkerMyAngularSuffix to an array that contains it', () => {
        const worker: IWorkerMyAngularSuffix = sampleWithRequiredData;
        const workerCollection: IWorkerMyAngularSuffix[] = [
          {
            ...worker,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWorkerMyAngularSuffixToCollectionIfMissing(workerCollection, worker);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WorkerMyAngularSuffix to an array that doesn't contain it", () => {
        const worker: IWorkerMyAngularSuffix = sampleWithRequiredData;
        const workerCollection: IWorkerMyAngularSuffix[] = [sampleWithPartialData];
        expectedResult = service.addWorkerMyAngularSuffixToCollectionIfMissing(workerCollection, worker);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(worker);
      });

      it('should add only unique WorkerMyAngularSuffix to an array', () => {
        const workerArray: IWorkerMyAngularSuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const workerCollection: IWorkerMyAngularSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addWorkerMyAngularSuffixToCollectionIfMissing(workerCollection, ...workerArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const worker: IWorkerMyAngularSuffix = sampleWithRequiredData;
        const worker2: IWorkerMyAngularSuffix = sampleWithPartialData;
        expectedResult = service.addWorkerMyAngularSuffixToCollectionIfMissing([], worker, worker2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(worker);
        expect(expectedResult).toContain(worker2);
      });

      it('should accept null and undefined values', () => {
        const worker: IWorkerMyAngularSuffix = sampleWithRequiredData;
        expectedResult = service.addWorkerMyAngularSuffixToCollectionIfMissing([], null, worker, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(worker);
      });

      it('should return initial array if no WorkerMyAngularSuffix is added', () => {
        const workerCollection: IWorkerMyAngularSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addWorkerMyAngularSuffixToCollectionIfMissing(workerCollection, undefined, null);
        expect(expectedResult).toEqual(workerCollection);
      });
    });

    describe('compareWorkerMyAngularSuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWorkerMyAngularSuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareWorkerMyAngularSuffix(entity1, entity2);
        const compareResult2 = service.compareWorkerMyAngularSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareWorkerMyAngularSuffix(entity1, entity2);
        const compareResult2 = service.compareWorkerMyAngularSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareWorkerMyAngularSuffix(entity1, entity2);
        const compareResult2 = service.compareWorkerMyAngularSuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
