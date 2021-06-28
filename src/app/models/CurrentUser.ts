import { RoleName } from './RoleName';
export class CurrentUser 
{
  id: number;
  userDni: string;
  roleName: RoleName;
  token: string;
  isAuthenticated: boolean;
  available: boolean;
}