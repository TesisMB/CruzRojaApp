export interface TypeChatRooms  {
  id: number;
  isGroupChat: boolean;

  chatRooms: [{
      chatRoomID: number;
      createdDate: Date;

      usersChatRooms: [{
        userID: number;
        name: string;
      }]

      emergenciesDisasters: {
        emergencyDisasterID: number;
        locationCityName: string;
        typeEmergencyDisasterID: number;
        typeEmergencyDisasterName: string;
        typeEmergencyDisasterIcon: string;
      }

    }
  ]
}


/* export class chat {
  ID: number
  usersChat:{
    userID: number,
    name: string
  }
} */

/* export class chatRooms {
  chatRoomID: number
  createdDate: Date

  UsersChatRooms: {
    userID: number;
    name: string;
  };
}

export interface emergenciesDisasters {
  emergencyDisasterID: number,
  locationCityName: string,
  typeEmergencyDisasterID: number,
  typeEmergencyDisasterName: string,
  ypeEmergencyDisasterIcon: string
} */
