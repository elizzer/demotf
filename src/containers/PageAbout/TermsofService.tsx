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

export interface TermsofService {
  className?: string;
}

const TermsofService: FC<TermsofService> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="TermsofService"
    >
      <Helmet>
        <title>Terms of Service || travelfika</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg=""
          heading="👋 Terms of Service."
          btnText=""
          subHeading=""
        />
        <div>
            <p>We provide our Service to help you find information about Travel Services and to assist you in booking those Travel Services. It is provided to you for no other purpose.
            </p>
            <br /><br />
            <p>You agree that:</p><br />

            <ul><br />
            <li>you will only use our Service for personal and non-commercial purposes</li><br />

            <li>you must be at least 18 years of age and have the legal authority to enter into contracts</li><br />

            <li>you will use our Service lawfully and in compliance with these Terms</li><br />

            <li>all information supplied by you is true, accurate, current and complete</li><br />
            </ul><br />

            <p>if you have an account with us, you will:</p><br />

            <ul><li>safeguard your account information</li><br />

            <li>be responsible for any use of your account by you or others</li><br /></ul><br />

            <p>if you book on behalf of others:</p><br />

            <ul><li>you will obtain their authorization prior to acting on their behalf</li><br />

            <li>you will inform them about the terms that apply to the booking (including the Rules and Restrictions) and ensure that they agree to such terms</li><br />

            <li>you are responsible for paying any amounts due, for making any change/cancellation requests and for all other matters relating to the booking.</li></ul><br />
        </div>

        {/*<SectionFounder />
        <div className="relative py-16">
          <BackgroundSection />
          {/*<SectionClientSay uniqueClassName="PageAbout_" />
        </div>*/}

        {/*<SectionStatistic />

  <SectionSubscribe2 />*/}
      </div>
    </div>
  );
};

export default TermsofService;
