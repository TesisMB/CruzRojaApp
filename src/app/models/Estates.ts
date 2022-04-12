export interface Estates {
    estatePhone: number,
    locationAddress: LocationAddress;
    locationCityName: string;

    estatesTimes:[{
                times: Times;
             }];
}
export interface LocationAddress {
    address: string;
    numberAddress: string;
}

export interface Times {
    startTime: number;
    endTime: number;
    schedules: {
        scheduleDate: string;
    };
}