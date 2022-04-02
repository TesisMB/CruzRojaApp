import { TypeEmergenciesDisasters, Employees, Locations, Alert, ChatRooms, Volunteer } from './index';

export interface EmergenciesDisasters {
  emergencyDisasterID: number;
  emergencyDisasterStartDate: string;
  emergencyDisasterEndDate: string;
  emergencyDisasterInstruction: string;
  employees: Employees;
  locations: Locations;
  typesEmergenciesDisasters: TypeEmergenciesDisasters;
  alerts: Alert;
  chatRooms: ChatRooms
  volunteer: Volunteer
}
