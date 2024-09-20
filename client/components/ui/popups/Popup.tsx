"use client";
import React, { FC, useRef, useState } from "react";
import "./style.css";
import { Button } from "@nextui-org/react";
import { IoClose } from "react-icons/io5";

interface IPopup {
  children: React.ReactNode;
  closeFn?: () => void;
  openFn?: () => void;
  show: boolean;
  title: string;
  btnText?: string;
}

const Popup: FC<IPopup> = ({
  children,
  closeFn,
  openFn,
  show,
  title,
  btnText,
}: IPopup) => {
  const popupRef = useRef(null); // Ref to hold the popup element
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (
      !popupRef.current ||
      popupRef.current?.contains(event.target as HTMLElement)
    ) {
      closeFn();
      return;
    }
  };

  return (
    <div>
      {btnText && (
        <Button
          color="warning"
          onClick={openFn}
          className="flex text-white p-2 ml-auto card-shadow"
        >
          {btnText}
        </Button>
      )}
      {show && (
        <div className="popup" ref={popupRef}>
          <div className="popup-content">
            {/* Your popup content goes here */}
            <div className="text-cyan-900">
              <h2 className="text-cyan-700 font-semibold text-lg pb-2 uppercase">
                {title}
              </h2>
              {children}
            </div>

            <button
              className="w-8 h-8 cursor-pointer text-white absolute right-[-30px] top-[-20px] z-50"
              onClick={closeFn}
            >
              <IoClose className="w-full h-full" />
            </button>
          </div>
          <button className="popup-overlay" onClick={handleClose}></button>
        </div>
      )}
    </div>
  );
};

export default Popup;
