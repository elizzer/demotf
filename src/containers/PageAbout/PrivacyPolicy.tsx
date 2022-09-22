import rightImg from "images/about-hero-right.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionHero from "./SectionHero";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";

export interface PrivacyPolicy {
  className?: string;
}

const PrivacyPolicy: FC<PrivacyPolicy> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PrivacyPolicy"
    >
      <Helmet>
        <title>Privacy Policy || Travelfika</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />
      

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg=""
          heading="👋 Privacy policies."
          btnText=""
          subHeading=""
        />
        <div>
            <p>Your privacy and the security and confidentiality of your data are very important to us. You’ve placed your trust in us by using our services. We value that trust. We are committed to protecting and safeguarding any personal data that you give us. We want you to understand how we use your data and your rights regarding that data.

                <br></br><br></br>This website is owned and operated by travelfika.com Corp ("Travelfika"). This Privacy & Cookies Policy explains how we collect, use, share, and process personal data through the Priceline website, the travelfika mobile site, our iPhone, Android, and other mobile applications, and any other online communications and interfaces (the "Site").</p>
        </div>

        {/*<SectionFounder />
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="PrivacyPolicy_" />
        </div>

        <SectionStatistic />

  <SectionSubscribe2 />*/}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
