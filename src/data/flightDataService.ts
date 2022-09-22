import React, { useState } from "react";
import { config } from '../config';
import __airportCode from "./jsons/__airportCode.json";
import flightMockResult from "./jsons/Response_From_tripro_flight_search_travlfika_format.json";
import axios from 'axios';
import moment from "moment";


export interface DateRage {
    DepartureDate: moment.Moment | null;
}

let searchForm: searchFormProps, flightList:any;
export interface originDestinationProps {
    "Origin" : string;
    "Destination" : string;
    "DepartureDate" : string
  }
export interface searchFormProps {
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

export const flightDataService = {
    getAirportList,
    getByAirportKey,
    getSearchFormStructure,
    getSearchForm,
    setSearchForm,
    callFlightList,
    getFlightListData,
    setFlightList,
    setFormDataStore,
    getFormDataStore,
    getRepriceData
};

function  demo(name: string){
    console.log("Hello", name)
    return name 
}

function setSearchForm(data:searchFormProps){
    //localStorage.setItem('searchForm', data);
    searchForm = data;    
}

function getSearchForm(){
    return searchForm;
}
function setFormDataStore(data: any){
    localStorage.setItem('formDataStore', JSON.stringify(data));
}
 function getFormDataStore(){
    let data = localStorage.getItem('formDataStore');
    return data && JSON.parse(data);  
}


function getSearchFormStructure(){
    searchForm = {
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
    }
    return searchForm;
}

async function getAirportList() {
    // const requestOptions = {
    //     method: 'GET'+
    // };

    const response = await axios.get(`${config.apiUrl}/airportSearch/`);
    return handleResponse(response);
}

function getByAirportKey(key:string) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}utils/airportSearch/${key}`, requestOptions).then(handleResponse);
}

function setFlightList(FlightList:any){
    flightList = FlightList;
}

function getFlightListData(){
    // if(!flightList){
    //     return flightMockResult;
    // }
    return flightList;
}


function handleResponse(response:any) {
    return response.text().then((text:any) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
     
        return data.result;
    });
}
function callFlightList(searchForm:searchFormProps){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchForm)
    };
   
    return fetch(`${config.apiUrl}flight/search/`, requestOptions).then(handleResponse);
}
function handleRepriceResponse(response:any) {
    return response.text().then((text:any) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
     
        return data;
    });
}
function getRepriceData(id:any,data:any){
    const requestOptions={
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(data)
    }
    return fetch(`${config.repriceUrl}flight/reprice/${id}`, requestOptions).then(handleRepriceResponse);
}
