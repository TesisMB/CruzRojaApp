import { TypeEmergenciesDisasters, Employees, Locations, Alert } from './index';

export interface EmergenciesDisasters {
  emergencyDisasterID: number;
  emergencyDisasterStartDate: Date;
  emergencyDisasterEndDate: Date;
  emergencyDisasterInstruction: string;
  employees: Employees;
  locations: Locations;
  typesEmergenciesDisasters: TypeEmergenciesDisasters;
  alerts: Alert;
}
