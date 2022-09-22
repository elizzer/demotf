import React, { FC } from "react";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SocialsList1 from "shared/SocialsList1/SocialsList1";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import {useState} from "react"
export interface PageContactProps {
  className?: string;
}

const info = [
  {/*{
    title: "🗺 ADDRESS",
    desc: "Travelfika",
  },*/},
  {
    title: "💌 EMAIL",
    desc: "support@travelfika.com",
  },
  {
    title: "☎ PHONE",
    desc: "+12016169718",
  },
];

const PageContact: FC<PageContactProps> = ({ className = "" }) => {

  const [formData,setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    mobileNumber:"",
    subject:"",
    message:"",
    baseAirport:""
  
  })

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
      baseAirport:""
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

  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        
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
      className={`nc-PageContact overflow-hidden ${className}`}
      data-nc-id="PageContact"
    >
      <Helmet>
        <title>Contact us|| Travelfika</title>
      </Helmet>
      <div className="mb-24 lg:mb-32">
        <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Contact
        </h2>
        <div className="container max-w-7xl mx-auto">
          <div className="flex-shrink-0  ">
            <>
            {/* <div className = "pad">
              <div className="max-w-sm space-y-8 tc">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                </div>
                ))} 
              </div>             
            </div> */}
            {/*<div>
              <form className="grid grid-cols-1 gap-6" action="#" method="post">
              <label className="block">
                  <Label>Full name</Label>

                  <Input
                    placeholder="Example Doe"
                    type="text"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>Email address</Label>
                  
                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className="mt-1"
                    />
                    </label>
                    <label className="block">
                    <Label>Message</Label>
                    
                    <Textarea className="mt-1" rows={6} />
                    </label>
                    <div>
                    <ButtonPrimary type="submit">Send Message</ButtonPrimary>
                    </div>
                    </form>
                  </div>*/}


              {renderSidebar()}

            {/* <div className="pad1">
              <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
              🌏 SOCIALS
              </h3>
              <SocialsList1 className="mt-2" />
            </div> */}
            </>
          </div>
        </div>
      </div>

      {/* OTHER SECTIONS 
      <div className="container">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="Pagecontact_" />
        </div>
        <SectionSubscribe2 className="py-24 lg:py-32" />
      </div>*/}
    </div>
  );
};

export default PageContact;