
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { TaxonomyType } from "data/types";
import React, { FC, useState, useEffect } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";
import { flightDataService } from "../../data/flightDataService";
import { useHistory } from "react-router-dom";
import Loader from "components/loader/loader";
import HeroSearchForm, {
  SearchTab,
} from "components/HeroSearchForm/HeroSearchForm";
import moment from "moment";
import { DateRage } from "../../components/HeroSearchForm/StaySearchForm";
import { TimeRage } from "../../components/HeroSearchForm/RentalCarSearchForm";
import Heading from "components/Heading/Heading";
import HeadingFlights from "components/Heading/headingFlights";
import Heading2 from "components/Heading/Heading2";
import ModifyTab from "components/SectionHeroArchivePage/ModifyTab";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import Button from "shared/Button/Button";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface ListingFlightsPageProps {
  className?: string;
}


export interface loadingFlightProps {
  dateRangeValue: DateRage;
  timeRangeValue: TimeRage;
  journeyType:string;
  guestCount:{
    NoOfAdults:number;
    NoOfChildren:number;
    NoOfInfants:number
  };
  totalGuest:number
  pickUpInputValue: string;
  dropOffInputValue: string;
  flightClass:string;
}
const ListingFlightsPage: FC<ListingFlightsPageProps> = ({
  className = "",
}) => {
  const history = useHistory();
  const goHome = () =>{  
    history.push("/");
  }
  const loadingDataModel = {
    pickUpInputValue: "",
    dropOffInputValue: "",
    journeyType:"",
    flightClass:"",
    guestCount:{
      NoOfAdults:1,
      NoOfChildren:0,
      NoOfInfants:0

    },
    totalGuest:1,
    dateRangeValue: {
      startDate: moment(),
      endDate: moment()
    },
    timeRangeValue: {
      startTime: "",
      endTime: ""
    }
  }
  const [g,setG]=useState(loadingDataModel.totalGuest);
  const [modifySearchTab, setmodifySearchTab] = useState<boolean>();
  const [loadIcon, enableLoadIcon] = useState<boolean>();
  const [popup, enablepopup] = useState<boolean>();
  const [flightResult, setFlightResult] = useState<[]>([]);
  const [loadingData, setLoadingData] = useState<loadingFlightProps>();
  
  // console.log()
  useEffect(() => {
    setmodifySearchTab(false);
    enableLoadIcon(false);
    enablepopup(false)
    
  },[])
  let searchForm =  flightDataService.getSearchForm();
  useEffect(() => {    
    const flightData = async() =>{
      if(!searchForm || searchForm.JourneyType === "" || searchForm.ClassType === "" || searchForm.NoOfAdult.Count === 0){
        goHome();
      }
      else{
        
        enableLoadIcon(true);
        loadingDataModel.pickUpInputValue = searchForm.OriginDestination[0].Origin;
        loadingDataModel.dropOffInputValue = searchForm.OriginDestination[0].Destination
        loadingDataModel.journeyType=searchForm.JourneyType[0]
        loadingDataModel.flightClass=searchForm.ClassType[0]
        loadingDataModel.guestCount.NoOfAdults=searchForm.NoOfAdult.Count 
        loadingDataModel.guestCount.NoOfChildren= searchForm.NoOfChildren.Count
        loadingDataModel.guestCount.NoOfInfants=searchForm.NoOfInfant.Count
        loadingDataModel.totalGuest=searchForm.NoOfAdult.Count + searchForm.NoOfChildren.Count + searchForm.NoOfInfant.Count
        loadingDataModel.dateRangeValue = {
          startDate: moment(searchForm.OriginDestination[0].DepartureDate),
          endDate: moment(searchForm.OriginDestination[searchForm.OriginDestination.length - 1].DepartureDate),
        }
        loadingDataModel.timeRangeValue = {
          startTime: "10:00 AM",
          endTime: "10:00 AM",
        }
        setG(loadingDataModel.totalGuest)
        // const totalGuest=loadingDataModel?.guestCount.NoOfAdults+loadingDataModel?.guestCount.NoOfChildren+loadingDataModel?.guestCount.NoOfInfants
        setLoadingData(loadingDataModel);
        let flightList = await flightDataService.callFlightList(searchForm);
        flightList && setFlightResult(flightList.SearchResult);
        flightList && flightDataService.setFlightList(flightList.SearchResult);
        // setmodifySearchTab(true);        
        enableLoadIcon(false);
        enablepopup(false)
      }
    }
    flightData();
  },[searchForm]);
  if(window.matchMedia("(max-width:780px)").matches && popup){
    window.scrollTo({
      top: 250,
        left: 0,
        behavior: 'smooth'
      });
  }
  
  return (
    <div
      className={`nc-ListingFlightsPage relative z-0 overflow-hidden ${window.matchMedia("(min-width: 2400px)").matches && popup==true?"h-screen":"h-max"}`}
      data-nc-id="ListingFlightsPage"
    >
      <Helmet>
        <title>Flights-listing || TravelFika</title>
      </Helmet>
      
      <div className="container relative lg:mb-35">
        
       <div className="mt-3">
       <Heading2
        heading={loadingData?.pickUpInputValue + ' - ' + loadingData?.dropOffInputValue}
        subHeading={
          <>
           <span className="block mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            {flightResult.length!=0 && flightResult.length}{ flightResult.length!=0 && " flights"}
            {flightResult.length!=0 && <span className="mx-2">·</span>}
            {loadingData?.journeyType=="R"?"Round trip":"One way"}
            <span className="mx-2">·</span>
            {loadingData?.totalGuest} {loadingData?.totalGuest==1?"Passenger":"Passengers"}
            (
              {loadingData?.guestCount.NoOfAdults}-{loadingData?.guestCount.NoOfAdults==1?"Adult":"Adults"} 
              {loadingData?.guestCount.NoOfChildren!=0 && <span className="mx-2">·</span> }
              {loadingData?.guestCount.NoOfChildren!==0 && loadingData?.guestCount.NoOfChildren}
              {loadingData?.guestCount.NoOfChildren!==0 && loadingData?.guestCount.NoOfChildren==1?"- Child":""}
              {loadingData?.guestCount.NoOfChildren!==0 && loadingData?.guestCount.NoOfChildren!=1?"- Children":""}
              {loadingData?.guestCount.NoOfInfants!=0 &&  <span className="mx-2">·</span>}
              {loadingData?.guestCount.NoOfInfants!=0 && loadingData?.guestCount.NoOfInfants}
              {loadingData?.guestCount.NoOfInfants!=0 && loadingData?.guestCount.NoOfInfants==1?"- Infant":""}
              {loadingData?.guestCount.NoOfInfants!=0 && loadingData?.guestCount.NoOfInfants!=1?"- Infants":""}
            )
            <span className="mx-2">·</span>
            {loadingData?.flightClass=="E"?"Economy":"Business"}
          </span>
          {
            !loadIcon && <ButtonPrimary className="mb-2 lg:mb-0 mt-2" onClick={() => {setmodifySearchTab(!modifySearchTab); enablepopup(!popup)}}>Modify Search</ButtonPrimary>
          }
           { modifySearchTab  && !loadIcon && popup &&
            <div className="z-20 mt-2 mb-5">
                      <ModifyTab
                        currentPage={loadingData?.journeyType=="R"?"Round trip":"One way"}
                        currentTab={loadingData?.journeyType=="R"?"Round trip":"One way"}
                        loadingFlight={loadingData}
                        className={`w-full z-50  `}
                      />
             </div>}
          </>
         
        }
      />
       </div>

           {loadIcon &&
              <div className="mt-10 mb-20">
                  <Loader content={"Loading Flights..."} />
                </div>   
           }
      
      
          
   
       <div className="z-10">
       {!loadIcon  && <SectionGridFilterCard className="z-10 pb-24 lg:pb-32" flightResult={flightResult} 
        onClick={(data:any) =>{ setmodifySearchTab(data.modifySearchTab); }}/>}
       </div>
       

        {/* SECTION */}
        {/* <SectionSubscribe2 className="py-24 lg:py-32" /> */}
      </div>
    </div>
  );
};
//  console.log(flightDataService.getFlightListData())

export default ListingFlightsPage;