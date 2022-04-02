import { UserChatRooms } from './UserChatRooms';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface ChatRooms {
    id: number;
    creationDate: Date;
    usersChatRooms: UserChatRooms[];
    emergenciesDisasters: {
        emergencyDisasterID: number;
        locationCityName: string;
        typeEmergencyDisasterID: number;
        typeEmergencyDisasterName: string;
        typeEmergencyDisasterIcon: string;
    };

    messages: [
        {
            id: number;
            message: string;
            messageState: false;
            createdDate: Date;
            // eslint-disable-next-line @typescript-eslint/naming-convention
            FK_ChatRoomID?: string;
            // eslint-disable-next-line @typescript-eslint/naming-convention
            FK_UserID: number;

            // eslint-disable-next-line @typescript-eslint/naming-convention
            FK_LocationVolunteerID?: number;
            userID: number;
        }
    ];

}
