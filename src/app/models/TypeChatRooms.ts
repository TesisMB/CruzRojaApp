import { ChatRooms } from './ChatRooms';

export interface TypeChatRooms {
  id: number;
  isGroupChat: boolean;
  chatRooms: ChatRooms[];
}
