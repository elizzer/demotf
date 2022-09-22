import React, { FC, Fragment, useState,useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/outline";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import CommentListing from "components/CommentListing/CommentListing";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import GuestsInput from "components/HeroSearchForm/GuestsInput";
import StayDatesRangeInput from "components/HeroSearchForm/StayDatesRangeInput";
import { DateRage } from "components/HeroSearchForm/StaySearchForm";
import StartRating from "components/StartRating/StartRating";
import GoogleMapReact from "google-map-react";
import useWindowSize from "hooks/useWindowResize";
import moment from "moment";
import { DayPickerRangeController, FocusedInputShape } from "react-dates";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonCircle from "shared/Button/ButtonCircle";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Input from "shared/Input/Input";
import NcImage from "shared/NcImage/NcImage";
import LikeSaveBtns from "./LikeSaveBtns";
import ModalPhotos from "./ModalPhotos";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { TaxonomyType } from "data/types";
import { useParams } from 'react-router';
import { stringify } from "querystring";
import CSS from 'csstype';
import axios from "axios";

const desc: CSS.Properties = {
  whiteSpace:"pre-line"
};

export interface ListingStayDetailPageProps {
  className?: Number | string;
  isPreviewMode?: boolean;
}



const Amenities_demos = [
  { name: "la-key", icon: "la-key" },
  { name: "la-luggage-cart", icon: "la-luggage-cart" },
  { name: "la-shower", icon: "la-shower" },
  { name: "la-smoking", icon: "la-smoking" },
  { name: "la-snowflake", icon: "la-snowflake" },
  { name: "la-spa", icon: "la-spa" },
  { name: "la-suitcase", icon: "la-suitcase" },
  { name: "la-suitcase-rolling", icon: "la-suitcase-rolling" },
  { name: "la-swimmer", icon: "la-swimmer" },
  { name: "la-swimming-pool", icon: "la-swimming-pool" },
  { name: "la-tv", icon: "la-tv" },
  { name: "la-umbrella-beach", icon: "la-umbrella-beach" },
  { name: "la-utensils", icon: "la-utensils" },
  { name: "la-wheelchair", icon: "la-wheelchair" },
  { name: "la-wifi", icon: "la-wifi" },
  { name: "la-baby-carriage", icon: "la-baby-carriage" },
  { name: "la-bath", icon: "la-bath" },
  { name: "la-bed", icon: "la-bed" },
  { name: "la-briefcase", icon: "la-briefcase" },
  { name: "la-car", icon: "la-car" },
  { name: "la-cocktail", icon: "la-cocktail" },
  { name: "la-coffee", icon: "la-coffee" },
  { name: "la-concierge-bell", icon: "la-concierge-bell" },
  { name: "la-dice", icon: "la-dice" },
  { name: "la-dumbbell", icon: "la-dumbbell" },
  { name: "la-hot-tub", icon: "la-hot-tub" },
  { name: "la-infinity", icon: "la-infinity" },
];

export interface dataProps{
  dealName?:string
}
interface pageDetials{
  flightData:{
    From?:String;
    To?:String;
    price?:Number;
    currency?:String
  }
  _id?:String;
  gallery?:Array<string>;
  title:String,
  description:String
}

const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({
  className = "",
  isPreviewMode,
}) => {
  const [pageData,setPageData]=useState<pageDetials>();
  const [PHOTOS,setphotos]=useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openFocusIndex, setOpenFocusIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<DateRage>({
    startDate: moment(),
    endDate: moment().add(4, "days"),
  });

const {dealName}=useParams<dataProps>()
 
const [formData,setFormData]=useState({
  firstName:"",
  lastName:"",
  email:"",
  mobileNumber:"",
  subject:"",
  message:"",
  dealName:dealName,
  baseAirport:"",


})

  useEffect(()=>{
    axios.get<any>(`https://api.travelfika.com/api/v1/bestDeals/Flight/${dealName}`).then(res=>{
        const res1:any=res.data
        console.log('[+]flight deals response ',dealName)
        setPageData(res1.message)
        setphotos(res1.message.gallery)
    })
  },[])

  const submitHandler=(e:any)=>{
    e.preventDefault()
    const data="Thanks"+" "+formData.firstName+"\n\n"+"We will get back to you within 24 hours for any submitted questions."
    alert(data)
    console.log('[+]Form data ',formData)
    fetch("https://api.travelfika.com/api/v1/bestDeals/pasDetials",{
      method:"POST",
      body:JSON.stringify(formData),
      headers:{
        "Content-type":"application/json"
      }
    })
    setFormData({
      firstName:"",
      lastName:"",
      email:"",
      mobileNumber:"",
      subject:"",
      message:"",
      dealName:dealName,
      baseAirport:"",
    
    })
  }

  const formChangeHandler=(e:any)=>{
    setFormData((prev:any)=>(
      {
        ...prev,
        [e.target.name]:e.target.value
      }
      ))
      
  }
  const [focusedInputSectionCheckDate, setFocusedInputSectionCheckDate] =
    useState<FocusedInputShape>("startDate");
  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);

  const windowSize = useWindowSize();
  
  const getDaySize = () => {
    if (windowSize.width <= 375) {
      return 34;
    }
    if (windowSize.width <= 500) {
      return undefined;
    }
    if (windowSize.width <= 1280) {
      return 56;
    }
    return 48;
  };

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  const handleOpenModal = (index: number) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };

  const handleCloseModal = () => setIsOpen(false);

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
        ✈ {pageData?.title}
        </h2>

      
      </div>
    );
  };

  const descStyle={
    whiteSpace:"pre-line"
  }

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Description</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* <div className="text-neutral-6000 dark:text-neutral-300">
          <span>
          Perched beside the tropical Western Ghats is the city of Coimbatore dubbed South India's Manchester for its famous textile industry. The Siruvani Falls and Adhiyogi statue - the world's largest bust sculpture are a few wonderful scenes that this city has to offer.
          </span>
          <br />
          <br />
          <span>
          It is also the gateway to the beautiful hill stations of the Nilgiris, India's largest protected forest, home to herds of elephants and elusive big cats like tigers and leopards among other wonderful creatures.
          </span>
          <br /> <br />
          <span>
          With pleasantly chill weather throughout the year along with lakes and waterfalls here and there, the lovely city of Coimbatore is totally worth the visit! So book your vacation to Coimbatore now at offers starting from 1100$.
          </span>
        </div> */}
        <div className="text-neutral-6000 dark:text-neutral-300" style={desc} >
          {pageData?.description}
        </div>
      </div>
    );
  };

  // const renderSection3 = () => {
  //   return (
  //     <div className="listingSection__wrap">
  //       <div>
  //         <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
  //         Learn how to find cheap flights and save tons of money on airfare from Travelfika and our team of Flight Experts.
  //         </span>
  //       </div>
  //       <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
  //       </div>
  //   );
  // };

  

 
 
  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            <>
              $
              {pageData && pageData.gallery && pageData?.flightData?.price}
              <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                /person
              </span>
            </>
            
          </span>
          {/*<StartRating />*/}
        </div>

        {/* FORM */}
        <form onSubmit={submitHandler}>
          <div className="data">      
          <input type="text" id="fname" onChange={formChangeHandler} value={formData.firstName}  name="firstName" placeholder="First name" required/>
          </div>
          
          <div className="data">      
          <input type="text" id="lname" onChange={formChangeHandler} value={formData.lastName} name="lastName" placeholder="Last name" />
          </div>
          
          <div className="data">
          <input type="email" id="email" onChange={formChangeHandler} value={formData.email} name="email"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="Email" required/>
          </div>
            
          <div className="data">      
          <input type="text" id="phone" onChange={formChangeHandler} value={formData.mobileNumber} name="mobileNumber"  maxLength={15} placeholder="Mobile number" required />
          </div>

          <div className="data">      
          <input type="text" id="preference" onChange={formChangeHandler} value={formData.baseAirport} name="prefered airport" placeholder="Prefered airport for departure" maxLength={100} required />
          </div>
                  
          <div className="data">      
          <input type="text" id="subject" onChange={formChangeHandler} value={formData.subject} name="subject" placeholder="subject" maxLength={500} />
          </div> 

          <div className="data">
          <textarea id="subject" name="message" onChange={formChangeHandler} value={formData.message}  placeholder="Write something" maxLength={2000}/>
          </div>
          <ButtonPrimary>Submit</ButtonPrimary>

          </form>
      </div>
    );
  };

  return (
    <div
      className={`nc-ListingStayDetailPage  ${className}`}
      data-nc-id="ListingStayDetailPage"
    >
      {/* SINGLE HEADER */}
      <>
        <header className="container 2xl:px-14 rounded-md sm:rounded-xl">
          <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
            <div
              className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={() => handleOpenModal(0)}
            >
              {
                PHOTOS && 
                <NcImage
                containerClassName="absolute inset-0"
                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                src={PHOTOS[0]}
                />
              }
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            { PHOTOS && PHOTOS.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
              <div
                key={index}
                className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                  index >= 3 ? "hidden sm:block" : ""
                }`}
              >
                <NcImage
                  containerClassName="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5"
                  className="object-cover w-full h-full rounded-md sm:rounded-xl "
                  src={item || ""}
                />

                {/* OVERLAY */}
                <div
                  className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => handleOpenModal(index + 1)}
                />
              </div>
            ))}

            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              onClick={() => handleOpenModal(0)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </div>
          </div>
        </header>
        {/* MODAL PHOTOS */}
        {
        pageData &&
          <ModalPhotos
          imgs={PHOTOS}
          isOpen={isOpen}
          onClose={handleCloseModal}
          initFocus={openFocusIndex}
          uniqueClassName="nc-ListingStayDetailPage-modalPhotos"
          />
        }
      </>

      {/* MAIn */}
      <main className="container relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {renderSection1()}
          {renderSection2()}
          {/* {renderSection3()} */}
         
        </div>

        {/* SIDEBAR */}
        <div className="block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-24">{renderSidebar()}</div>
        </div>
      </main>

      {/* STICKY FOOTER MOBILE */}
      {/* {!isPreviewMode && (
        <div className="block lg:hidden fixed bottom-0 inset-x-0 py-4 bg-white text-neutral-900 border-t border-neutral-200 z-20">
          <div className="container flex items-center justify-between">
            <span className="text-2xl font-semibold">
              $311
              <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                /night
              </span>
            </span>

            <ButtonPrimary href="##">Reserve</ButtonPrimary>
          </div>
        </div>
      )} */}

    </div>
  );
};

export default ListingStayDetailPage;
