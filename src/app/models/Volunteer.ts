import { Skills } from './index';
export interface Volunteer{
    /* usersVolunteers: User; */
    name: string;
    userDni: string;
    id: number;
    volunteersSkills: Skills[];
    volunteerAvatar: string;
}


