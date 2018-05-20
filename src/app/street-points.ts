export class StreetPoints {


public point : {    cp:Number,
     region: string, localAuthority:string, latitude: Number,
    longitude: Number,roadName: string, roadCategory: string,
     linkLengthKm: Number
}
    public statusOverTime :{ 
        year: Number;
        allMv: Number;
        trafficCapacityRatio : Number;
        trafficStatus : Number;
        estimationMethod : String   
    }[]
}