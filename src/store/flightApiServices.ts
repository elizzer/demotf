import { config } from '../config';
import { searchForm } from './flightDataTypes';
import axios from "axios";
export const flightApiServices = {
    getByAirportKey,
    getFlightList
};


function getByAirportKey(key:string) {
    const requestOptions = {
        method: 'GET'
    };

    return axios.get(`${config.apiUrl}utils/airportSearch/${key}`, requestOptions).then(handleResponse);
}

function getFlightList(searchForm:searchForm){
    const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchForm)
    };
    return axios.post(`${config.apiUrl}flight/search/`, requestOptions).then(handleResponse);
}

function handleResponse(response:any) {
    if (response.statusText !== "OK") {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
        }
        const error = (response.data && response.data.message) || response.statusText;
        return Promise.reject(error);
    }
    
    return response.data.result;
}