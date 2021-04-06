export interface WarrantyDto {
  clientSing: number;
  apartmentId: number;
  warrantyTypeIds: number[];
  statusId: number;
  value: number;
  contractInfoId: number;
  closeAt: Date;
}
