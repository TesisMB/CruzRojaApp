import { EmergenciesDisasters, UserChatRooms, Messages } from './index';

export interface ChatRooms {
  creationDate:         string;
  emergenciesDisasters: EmergenciesDisasters;
  id:                   number;
  messages:             Messages[];
  usersChatRooms:       UserChatRooms[];
}


