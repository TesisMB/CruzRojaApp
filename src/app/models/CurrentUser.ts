import { RoleName, Person, Estates } from './index';
export interface CurrentUser  {
  userDni: string;
  userAvailability: boolean;
  persons: Person;
  estates: Estates;
  roleName: RoleName;
  token: string;
  userID: number;
  avatar: string;
  createdDate: Date;
}
