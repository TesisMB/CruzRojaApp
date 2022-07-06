import { TypeEmergenciesDisasters, Employees, LocationsEmergenciesDisasters, Alert, ChatRooms, Volunteer } from './index';

export interface EmergenciesDisasters {
  emergencyDisasterID: number;
  emergencyDisasterStartDate: string;
  emergencyDisasterEndDate: string;
  emergencyDisasterInstruction: string;
  employees: Employees;
  locationsEmergenciesDisasters: LocationsEmergenciesDisasters;
  typesEmergenciesDisasters: TypeEmergenciesDisasters;
  alerts: Alert;
  chatRooms: ChatRooms;
  volunteer: Volunteer;
}
