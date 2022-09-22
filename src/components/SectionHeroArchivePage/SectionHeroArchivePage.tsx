import React, { FC, ReactNode } from "react";
import imagePng from "images/hero-right2.png";
import HeroSearchForm, {
  SearchTab,
} from "components/HeroSearchForm/HeroSearchForm";
import Modifytab from "./ModifyTab";

export interface SectionHeroArchivePageProps {
  className?: string;
  listingType?: ReactNode;
  currentPage: "Round trip" | "Multicity" | "One way" ;
  currentTab: SearchTab;
  rightImage?: string;
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  className = "",
  listingType,
  currentPage,
  currentTab,
  rightImage = imagePng,
}) => {
  return (
    <div
      className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
      data-nc-id="SectionHeroArchivePage"
    >

      <div className="flow-root w-full">
        <div className="flex flex-col lg:flex-row lg:items-cente ">
          <HeroSearchForm currentPage={currentPage} currentTab={currentTab}/>
        </div>
      </div>
    </div>
  );
};

export default SectionHeroArchivePage;
