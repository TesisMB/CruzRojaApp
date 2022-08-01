/* eslint-disable @typescript-eslint/naming-convention */
export class Messages {
  message: string;
  name: string;
  avatar: string;
  roleName: string;
  id?: number;
  chatRoomID?: string;
  userID?: number;
  messageState?: boolean;
  createdDate?: any;
}

export interface HubMessage{
  message: string;
  chatRoomID?: string;
  userID?: number;
  createdDate?: any;
}
