import { RoleDto } from "./role.dto";

export interface UserDto {
  id: number;
  username: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleDto;
}