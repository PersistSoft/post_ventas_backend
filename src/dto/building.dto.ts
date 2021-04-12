import { ProjectDto } from "./project.dto";

export interface BuildingDto {
  id: number;
  name: string;
  floors: number;
  aparmentsNumber: number;
  project: ProjectDto;
}
