import { UserRoles } from '../user-roles';

export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  roles?: UserRoles[];
}
