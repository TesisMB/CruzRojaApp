export interface TypeChatRooms  {
  ID: number
  IsGroupChat: boolean;

  //Si el isGroupChat es false
  chat: {
    ID: number
    usersChat:{
      userID: number,
      name: string
    }
  };

  //Si el isGroupChat es true
  chatRooms: {
    ID: number,
    CreatedDate: Date,

    UsersChatRooms: {
      userID: number;
      name: string;
    };

    EmergenciesDisasters: {
      EmergencyDisasterID: number,
      LocationCityName: string,
      TypeEmergencyDisasterID: number,
      TypeEmergencyDisasterName: string,
      TypeEmergencyDisasterIcon: string
    }

  }
}
