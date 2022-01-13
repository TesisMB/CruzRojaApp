import { ChatRooms } from './ChatRooms';

export interface TypeChatRooms {
  id: number;
  isGroupChat: boolean;

  chatRooms: ChatRooms[];
  /* [{
   chatRoomID: number;
   createdDate: Date;

   usersChatRooms: [{
     userID: number;
     name: string;
   }];

   emergenciesDisasters: {
     emergencyDisasterID: number;
     locationCityName: string;
     typeEmergencyDisasterID: number;
     typeEmergencyDisasterName: string;
     typeEmergencyDisasterIcon: string;
   };
 }
 ]; */
}
