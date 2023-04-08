import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFactoryMyAngularSuffix } from '../factory-my-angular-suffix.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../factory-my-angular-suffix.test-samples';

import { FactoryMyAngularSuffixService } from './factory-my-angular-suffix.service';

const requireRestSample: IFactoryMyAngularSuffix = {
  ...sampleWithRequiredData,
};

describe('FactoryMyAngularSuffix Service', () => {
  let service: FactoryMyAngularSuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: IFactoryMyAngularSuffix | IFactoryMyAngularSuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FactoryMyAngularSuffixService);
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

    it('should create a FactoryMyAngularSuffix', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const factory = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(factory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FactoryMyAngularSuffix', () => {
      const factory = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(factory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FactoryMyAngularSuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FactoryMyAngularSuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FactoryMyAngularSuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFactoryMyAngularSuffixToCollectionIfMissing', () => {
      it('should add a FactoryMyAngularSuffix to an empty array', () => {
        const factory: IFactoryMyAngularSuffix = sampleWithRequiredData;
        expectedResult = service.addFactoryMyAngularSuffixToCollectionIfMissing([], factory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(factory);
      });

      it('should not add a FactoryMyAngularSuffix to an array that contains it', () => {
        const factory: IFactoryMyAngularSuffix = sampleWithRequiredData;
        const factoryCollection: IFactoryMyAngularSuffix[] = [
          {
            ...factory,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFactoryMyAngularSuffixToCollectionIfMissing(factoryCollection, factory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FactoryMyAngularSuffix to an array that doesn't contain it", () => {
        const factory: IFactoryMyAngularSuffix = sampleWithRequiredData;
        const factoryCollection: IFactoryMyAngularSuffix[] = [sampleWithPartialData];
        expectedResult = service.addFactoryMyAngularSuffixToCollectionIfMissing(factoryCollection, factory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(factory);
      });

      it('should add only unique FactoryMyAngularSuffix to an array', () => {
        const factoryArray: IFactoryMyAngularSuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const factoryCollection: IFactoryMyAngularSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addFactoryMyAngularSuffixToCollectionIfMissing(factoryCollection, ...factoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const factory: IFactoryMyAngularSuffix = sampleWithRequiredData;
        const factory2: IFactoryMyAngularSuffix = sampleWithPartialData;
        expectedResult = service.addFactoryMyAngularSuffixToCollectionIfMissing([], factory, factory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(factory);
        expect(expectedResult).toContain(factory2);
      });

      it('should accept null and undefined values', () => {
        const factory: IFactoryMyAngularSuffix = sampleWithRequiredData;
        expectedResult = service.addFactoryMyAngularSuffixToCollectionIfMissing([], null, factory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(factory);
      });

      it('should return initial array if no FactoryMyAngularSuffix is added', () => {
        const factoryCollection: IFactoryMyAngularSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addFactoryMyAngularSuffixToCollectionIfMissing(factoryCollection, undefined, null);
        expect(expectedResult).toEqual(factoryCollection);
      });
    });

    describe('compareFactoryMyAngularSuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFactoryMyAngularSuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFactoryMyAngularSuffix(entity1, entity2);
        const compareResult2 = service.compareFactoryMyAngularSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFactoryMyAngularSuffix(entity1, entity2);
        const compareResult2 = service.compareFactoryMyAngularSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFactoryMyAngularSuffix(entity1, entity2);
        const compareResult2 = service.compareFactoryMyAngularSuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
