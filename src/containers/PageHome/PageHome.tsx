import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionHero from "components/SectionHero/SectionHero";
// import React from "react";
// import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
// import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
// import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
// import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { TaxonomyType } from "data/types";
// import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
// import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
// import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
// import SectionVideos from "./SectionVideos";
// import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";


function PageHome() {
  
 
  const[dealData,setDealData]=useState([])
  console.log('[+]Before calling ',dealData)
  useEffect(()=>{
    fetch('https://api.travelfika.com/api/v1/bestDeals/Flight/all',{method:"GET"}).then(res=>res.json()).then(res=>{
      let temp = res.data.map((e:any,i:number)=>{
        return {
          id: i,
          href: `/flight-deals/${e.urlName}`,
          name: e.title,
          taxonomy: "category",
          count: e.flightData.price,
          desc:e.flightData.From,
          thumbnail:e.thumbnail,
        }
      })
      setDealData(temp)
    })
  },[])

  return (
    <div className="relative overflow-hidden nc-PageHome">
      <Helmet>
        <title>TravelFika || Plan your travel</title>
      </Helmet>
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative mb-24 space-y-24 lg:space-y-32 lg:mb-32">
        {/* SECTION HERO */}
        <SectionHero className="pb-16 " />
        {
          dealData.length>0 &&
          <SectionSliderNewCategories
          categories={dealData}
          uniqueClassName="PageHome_s1"
          />
        }
        

        {/* SECTION2 */}
        {/* <SectionOurFeatures /> */}

        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionGridFeaturePlaces />
        </div> */}

        {/* SECTION */}
        {/* <SectionHowItWork /> */}

        {/* SECTION 1 */}
        {/* <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionSliderNewCategories
            categories={DEMO_CATS_2}
            categoryCardType="card4"
            itemPerRow={4}
            heading="Suggestions for discovery"
            subHeading="Popular places to stay that Chisfis recommends for you"
            sliderStyle="style2"
            uniqueClassName="PageHome_s2"
          />
        </div> */}

        {/* SECTION */}
        {/* <SectionSubscribe2 /> */}

        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div> */}

        {/* SECTION */}
        {/* <SectionGridCategoryBox /> */}

        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div> */}

        {/* SECTION 1 */}
        {/* <SectionSliderNewCategories
          heading="Explore by types of stays"
          subHeading="Explore houses based on 10 types of stays"
          categoryCardType="card5"
          itemPerRow={5}
          uniqueClassName="PageHome_s3"
        /> */}

        {/* SECTION */}
        {/* <SectionVideos /> */}

        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="PageHome_" />
        </div> */}
      </div>
    </div>
  );
}

export default PageHome;
