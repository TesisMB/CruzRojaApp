export interface Volunteer{
    /* usersVolunteers: User; */
  name: string;
  userDni: string;
  id: number;
  volunteersSkills: [{
    skillName: string;
      volunteersSkillsFormationEstates: [{
        date: string;
        formationEstateName: string;
    }];
  }];
  volunteerAvatar: string;
}


