import { EmergenciesDisasters, UserChatRooms, Messages } from "./index";

export interface ChatRooms {
  id:                   number;
  creationDate:         Date;
  emergenciesDisasters: EmergenciesDisasters;
  usersChatRooms:       UserChatRooms[];
  messages:             Messages[];
}


