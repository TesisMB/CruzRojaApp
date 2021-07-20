import {User} from './index';
export interface Volunteer{
    users: User;
    volunteerID: number;
    volunteersSkills: [];
    volunteerAvatar: string;

    /*constructor(_users: User, _avatar: string, _id: number, _skillName: []){
        this.volunteerID = _id;
        this.users = _users;
        this.volunteerAvatar = _avatar;
        this.volunteersSkills = _skillName;
      }*/
}
