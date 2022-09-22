export interface originDestinationProps {
    "Origin" : string;
    "Destination" : string;
    "DepartureDate" : string
  }
export interface searchForm {
    "JourneyType": String,
    "OriginDestination": originDestinationProps[],
    "ClassType": String,
    "NoOfInfant": {
        "Count":number,
        "Age":Object
    },
    "NoOfChildren": {
        "Count":number,
        "Age":Object
    },
    "NoOfAdult":{
        "Count":number
    },
    "PreferredArilines":String[],
    "PreferredCurrency":String,
    "OtherInfo": {
        "RequestedIP": String,
        "TransactionId": String
    }
}
export interface airportkey{
    Airport_Code?: string;
    Airport_Name?: string;
    City_name?: string;
    Country_Abbrevation?: string;
    Country_Name?: string;
    World_Area_Code?: string;
    _id?: string;
}
export interface flightData{
    airportKey: [airportkey?],
    searchForm: searchForm,
    listingFlights: object
}