export interface UserChatRooms {
  name: string;
  roleName: string;
  userDni: string;
  userID: number;
  avatar: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fk_ChatRoomId: number;
  status: boolean;
}
