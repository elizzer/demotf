import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import React, { FC } from "react";

export interface AddCardProps {
  className?: string;
  placeholder?:string;
}

const AddCard: FC<AddCardProps> = ({ className = "" }) => {
  const renderCard=()=>{
    return(
      <div className="w-full flex flex-col justify-self-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 m-8 px-0 sm:p-6">
         <div className="space-y-1">
           <Label>Card number </Label>
           <Input placeholder="111 112 222 999" />
          </div>
          <div className="space-y-1">
            <Label>Card holder </Label>
            <Input placeholder="JOHN DOE" />
          </div>
          <div className="flex space-x-5  ">
            <div className="flex-1 space-y-1">
              <Label>Expiration date </Label>
              <Input type="month" placeholder="MM/YY" />
            </div>
            <div className="flex-1 space-y-1">
              <Label>CVC </Label>
              <Input />
            </div>
          </div>
          <div className="pt-4 self-center">
            <ButtonPrimary href="/dashboard">Add Card</ButtonPrimary>
          </div>
      </div>
    )
  }
  return(
    <div>
      <main className="flex flex-col items-center p-10">
        <div>
        <h3 className="text-2xl font-semibold">Add your card here</h3>
        </div>
        <div className="w-full sm:w-1/2 self-center ">{renderCard()}</div>
      </main>
    </div>
  )
  
}
export default AddCard