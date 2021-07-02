import { RoleName } from './RoleName';
export interface CurrentUser 
{
  id: number;
  userDni: string;
  roleName: RoleName;
  token: string;
  isAuthenticated: boolean;
  available: boolean;
}