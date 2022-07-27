/* eslint-disable @typescript-eslint/naming-convention */
export class Messages {
  message: string;
  name: string;
  avatar: string;
  roleName: string;
  id?: number;
  FK_ChatRoomID?: string;
  fK_UserID?: number;
  messageState?: boolean;
  createdDate?: string;
}

export interface HubMessage{
  message: string;
  FK_ChatRoomID?: string;
  fK_UserID?: number;
}
