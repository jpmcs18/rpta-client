export interface LandAppraisal {
  kind: string;
  area: number;
  unitValue: number;
  adjustment: number | undefined;
  total: number;
  marketValue: number;
}
