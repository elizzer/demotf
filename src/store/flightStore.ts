import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { flightData, searchForm } from './flightDataTypes';

const initialState: flightData = {
    searchForm: {
        "JourneyType": "",
        "OriginDestination": [],
        "ClassType": "",
        "NoOfInfant": {
            "Count": 0,
            "Age": {}
        },
        "NoOfChildren": {
            "Count": 0,
            "Age": {}
        },
        "NoOfAdult":{
            "Count": 1
        },
        "PreferredArilines":[],
        "PreferredCurrency":"INR",
        "OtherInfo": {
            "RequestedIP": "",
            "TransactionId": ""
        }
    },
    listingFlights: {},
    airportKey: []
}
// flight
const flightSlice = createSlice({
  name: 'flight',
  initialState: initialState,
  reducers: {
    setSearchForm: (state, action: PayloadAction<searchForm>) => {
      state.searchForm = action.payload;
    },
    getByAirportKey: (state, action: PayloadAction<[]>) => {
      state.airportKey = action.payload;
    },
    setFlightList: (state, action: PayloadAction<[]>) => {
      state.listingFlights = action.payload;
    } 
  },
});

export const { setSearchForm, getByAirportKey, setFlightList } = flightSlice.actions;

export default flightSlice.reducer;
