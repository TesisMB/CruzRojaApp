import { EmergenciesDisasters, UserChatRooms, Messages } from './index';

export interface ChatRooms {
  creationDate:         string;
  emergenciesDisasters: EmergenciesDisasters;
  id:                   number;
  messages:             Messages[];
  usersChatRooms:       UserChatRooms[];
}


export interface Chats {
    dateMessage: ChatDate[];
    id: number;
    emergenciesDisasters: EmergenciesDisasters;
  }

  export interface ChatDate{
      createdDate: string;
      messages: Messages[];
  }
