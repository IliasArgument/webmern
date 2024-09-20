import React, { FC } from "react";
import Popup from "./Popup";

interface ICheckEmailPopup {
  show: boolean;
}

const CheckEmailPopup: FC<ICheckEmailPopup> = ({ show }) => {
  return (
    <Popup title="password recovery" show={show}>
      <h3 className="text-center py-5 text-lime-400 text-2xl">Check Your mail 😊 </h3>
    </Popup>
  );
};

export default CheckEmailPopup;
