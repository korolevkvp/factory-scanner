import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMachineMyAngularSuffix } from '../machine-my-angular-suffix.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../machine-my-angular-suffix.test-samples';

import { MachineMyAngularSuffixService } from './machine-my-angular-suffix.service';

const requireRestSample: IMachineMyAngularSuffix = {
  ...sampleWithRequiredData,
};

describe('MachineMyAngularSuffix Service', () => {
  let service: MachineMyAngularSuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: IMachineMyAngularSuffix | IMachineMyAngularSuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MachineMyAngularSuffixService);
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

    it('should create a MachineMyAngularSuffix', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const machine = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(machine).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MachineMyAngularSuffix', () => {
      const machine = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(machine).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MachineMyAngularSuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MachineMyAngularSuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MachineMyAngularSuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMachineMyAngularSuffixToCollectionIfMissing', () => {
      it('should add a MachineMyAngularSuffix to an empty array', () => {
        const machine: IMachineMyAngularSuffix = sampleWithRequiredData;
        expectedResult = service.addMachineMyAngularSuffixToCollectionIfMissing([], machine);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(machine);
      });

      it('should not add a MachineMyAngularSuffix to an array that contains it', () => {
        const machine: IMachineMyAngularSuffix = sampleWithRequiredData;
        const machineCollection: IMachineMyAngularSuffix[] = [
          {
            ...machine,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMachineMyAngularSuffixToCollectionIfMissing(machineCollection, machine);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MachineMyAngularSuffix to an array that doesn't contain it", () => {
        const machine: IMachineMyAngularSuffix = sampleWithRequiredData;
        const machineCollection: IMachineMyAngularSuffix[] = [sampleWithPartialData];
        expectedResult = service.addMachineMyAngularSuffixToCollectionIfMissing(machineCollection, machine);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(machine);
      });

      it('should add only unique MachineMyAngularSuffix to an array', () => {
        const machineArray: IMachineMyAngularSuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const machineCollection: IMachineMyAngularSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addMachineMyAngularSuffixToCollectionIfMissing(machineCollection, ...machineArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const machine: IMachineMyAngularSuffix = sampleWithRequiredData;
        const machine2: IMachineMyAngularSuffix = sampleWithPartialData;
        expectedResult = service.addMachineMyAngularSuffixToCollectionIfMissing([], machine, machine2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(machine);
        expect(expectedResult).toContain(machine2);
      });

      it('should accept null and undefined values', () => {
        const machine: IMachineMyAngularSuffix = sampleWithRequiredData;
        expectedResult = service.addMachineMyAngularSuffixToCollectionIfMissing([], null, machine, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(machine);
      });

      it('should return initial array if no MachineMyAngularSuffix is added', () => {
        const machineCollection: IMachineMyAngularSuffix[] = [sampleWithRequiredData];
        expectedResult = service.addMachineMyAngularSuffixToCollectionIfMissing(machineCollection, undefined, null);
        expect(expectedResult).toEqual(machineCollection);
      });
    });

    describe('compareMachineMyAngularSuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMachineMyAngularSuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMachineMyAngularSuffix(entity1, entity2);
        const compareResult2 = service.compareMachineMyAngularSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMachineMyAngularSuffix(entity1, entity2);
        const compareResult2 = service.compareMachineMyAngularSuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMachineMyAngularSuffix(entity1, entity2);
        const compareResult2 = service.compareMachineMyAngularSuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
