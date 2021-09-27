import { User } from './index';
import { Skills } from './index';
export interface Volunteer{
    users: User;
    volunteerID: number;
    volunteersSkills: Skills[];
    volunteerAvatar: string;
}


