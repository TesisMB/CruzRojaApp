
/* eslint-disable @typescript-eslint/no-empty-interface */
export interface ChatRooms {
    chatRoomID: number;
    creationDate: Date;
    usersChatRooms: [
        {
            userID: number;
            name: string;
        }
    ];
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
            FK_LocationVolunteerID?: number;
        }
    ];

}
