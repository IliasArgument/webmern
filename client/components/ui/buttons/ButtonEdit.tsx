"use client";
import React from "react";
import Button from "./Button";

const ButtonEdit = ({ toggle }: any) => {
  return (
    <Button
      color="primary"
      onClick={toggle}
      aria-label="Edit"
      text="Edit"
      ariaLabel={""}
    >
      Edit
    </Button>
  );
};

export default ButtonEdit;
