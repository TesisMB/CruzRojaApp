export class Messages {
  id?: number;
  message: string;
  messageState?: boolean;
  createdDate?: Date;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FK_ChatRoomID?: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FK_LocationVolunteerID?: number;
}
