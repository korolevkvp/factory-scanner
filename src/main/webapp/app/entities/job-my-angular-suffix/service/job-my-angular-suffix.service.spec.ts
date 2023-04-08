import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IJobMyAngularSuffix } from '../job-my-angular-suffix.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../job-my-angular-suffix.test-samples';

import { JobMyAngularSuffixService } from './job-my-angular-suffix.service';

const requireRestSample: IJobMyAngularSuffix = {
  ...sampleWithRequiredData,
};

describe('JobMyAngularSuffix Service', () => {
  let service: JobMyAngularSuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: IJobMyAngularSuffix | IJobMyAngularSuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(JobMyAngularSuffixService);
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

    it('should create a JobMyAngularSuffix', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const job = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(job).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a JobMyAngularSuffix', () => {
      const job = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(job).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a JobMyAngularSuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of JobMyAngularSuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a JobMyAngularSuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addJobMyAngularSuffixToCollectionIfMissing', () => {
      it('should add a JobMyAngularSuffix to an empty array', () => {
        const job: IJobMyAngularSuffix = sampleWithRequiredData;
        expectedResult = service.addJobMyAngularSuffixToCollectionIfMissing([], job);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(job);
      });

      it('should not add a JobMyAngularSuffix to an array that contains it', () => {
        const job: IJobMyAngularSuffix = sampleWithRequiredData;
        const jobCollection: IJobMyAngularSuffix[] = [
          {
            ...job,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addJobMyAngularSuffixToCollectionIfMissing(jobCollection, job);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a JobMyAngularSuffix to an array that doesn't contain it", () => {
        const job: IJobMyAngularSuffix = sampleWithRequiredData;
        const jobCollection: IJobMyAngularSuffix[] = [sampleWithPartialData];
        expectedResult = service.addJobMyAngularSuffixToCollectionIfMissing(jobCollection, job);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(job);
      });

      it('should add only unique JobMyAngularSuffix to an array', () => {
        const jobArray: IJobMyAngularSuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const jobCollection: IJobMyAngularSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addJobMyAngularSuffixToCollectionIfMissing(jobCollection, ...jobArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const job: IJobMyAngularSuffix = sampleWithRequiredData;
        const job2: IJobMyAngularSuffix = sampleWithPartialData;
        expectedResult = service.addJobMyAngularSuffixToCollectionIfMissing([], job, job2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(job);
        expect(expectedResult).toContain(job2);
      });

      it('should accept null and undefined values', () => {
        const job: IJobMyAngularSuffix = sampleWithRequiredData;
        expectedResult = service.addJobMyAngularSuffixToCollectionIfMissing([], null, job, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(job);
      });

      it('should return initial array if no JobMyAngularSuffix is added', () => {
        const jobCollection: IJobMyAngularSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addJobMyAngularSuffixToCollectionIfMissing(jobCollection, undefined, null);
        expect(expectedResult).toEqual(jobCollection);
      });
    });

    describe('compareJobMyAngularSuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareJobMyAngularSuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareJobMyAngularSuffix(entity1, entity2);
        const compareResult2 = service.compareJobMyAngularSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareJobMyAngularSuffix(entity1, entity2);
        const compareResult2 = service.compareJobMyAngularSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareJobMyAngularSuffix(entity1, entity2);
        const compareResult2 = service.compareJobMyAngularSuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
