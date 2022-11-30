/* eslint-disable @typescript-eslint/naming-convention */
import { UserChatRooms } from './UserChatRooms';
import { TypeEmergenciesDisasters, Employees, LocationsEmergenciesDisasters, Alert, ChatRooms, Volunteer } from './index';
import { Victims } from './Victims';

export interface EmergenciesDisasters {
  alerts: Alert;
  chatRooms: ChatRooms;
  emergencyDisasterEndDate: string;
  emergencyDisasterID: number;
  emergencyDisasterStartDate: string;
  locationsEmergenciesDisasters: LocationsEmergenciesDisasters;
  typesEmergenciesDisasters: TypeEmergenciesDisasters;
  emergencyDisasterInstruction: string;
  usersChatRooms: UserChatRooms[];
  createdBy: number;
  createdByEmployee: string;
  employeeName: Employees;
  isSubscribe: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fk_EmplooyeeID: number;
  modifiedBy: number;
  modifiedByEmployee: string;
  victims?: Victims;
  volunteer?: Volunteer;
  quantity: number;
}
