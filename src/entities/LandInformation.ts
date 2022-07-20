import { Cancellation } from './Cancellation';
import { LandAppraisal } from './LandAppraisal';
import { LandAssessment } from './LandAssessment';

export interface LandInformation {
  taxDeclarationNo: string;
  propertyIndexNo: string;
  owner: string;
  address: string;
  admin: string;
  adminAddress: string;
  locationOfProperty: string;
  certificationOfTitleNo: string;
  cadastralLotNo: string;
  assessorsLotNo: string;
  blockNo: string;
  northBoundary: string;
  eastBoundary: string;
  southBoundary: string;
  westBoundary: string;
  remarks: string;
  effectivityYear: number | undefined;
  taxable: string;
  totalAssessedValue: string | undefined;
  totalAssessedAmount: number | undefined;
  totalAppraisalAmount: number | undefined;
  cancellationRemarks: Cancellation[] | undefined;
  appraisals: LandAppraisal[] | undefined;
  assessments: LandAssessment[] | undefined;
}
