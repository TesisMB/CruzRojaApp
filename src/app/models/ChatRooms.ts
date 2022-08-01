import { EmergenciesDisasters, UserChatRooms, Messages } from './index';

export interface ChatRooms {
  creationDate:         string;
  emergenciesDisasters: EmergenciesDisasters;
  id:                   number;
  messages:             Messages[];
  usersChatRooms:       UserChatRooms[];
  quantity:             number;
}


export interface Chats {
    dateMessage: ChatDate[];
    id: number;
    emergenciesDisasters: EmergenciesDisasters;
    lastMessage: string;
    quantity: number;
    usersChatRooms: UserChatRooms[];
  }

  export interface ChatDate{
      createdDate: string;
      messages: Messages[];
  }


