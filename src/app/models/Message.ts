import { User } from './User';
export class Messages {
  id?: number;
  message: string;
  messageState?: boolean;
  createdDate?: Date;
  FK_ChatRoomID?: string;
  fK_UserID?: number;
  FK_LocationVolunteerID?: number;
  userID?: number;
  // constructor( _message : string, _FK_ChatRoomID: number, _FK_LocationVolunteerID?: number,_id?: number) {
  //   this.messageState = false;
  //   this.createdDate = Date.now();
  //   this.id = _id || null;
  //   this.message = _message;
  //   this.FK_ChatRoomID = _FK_ChatRoomID;
  //   this.FK_LocationVolunteerID = _FK_LocationVolunteerID || null;
  // }
}
