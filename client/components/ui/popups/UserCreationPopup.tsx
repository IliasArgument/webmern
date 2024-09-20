"use client";
import React, { useState } from "react";
import Popup from "./Popup";
import { createStudent } from "@/services/students.service";
import { useQueryClient, useMutation } from "react-query";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import Button from "@/components/ui/buttons/Button";
import { InputRequired } from "../forms";

const UserCreationPopup = () => {
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      reset();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const createStudentData = (name: string, age: number, major: string) => ({
    name: name,
    age: age,
    major: major,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { name, age, major } = data;
    mutate.mutate(createStudentData(name, age, major));
    setShowPopup(false);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleOpen = () => {
    setShowPopup(true);
  };
  return (
    <Popup
      title="Creating student"
      show={showPopup}
      closeFn={handleClose}
      openFn={handleOpen}
      btnText='Create new student 😊'
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div>
          <InputRequired
            label="Name"
            register={register}
            name={"name"}
            validation={{ minLength: 5 }}
            errors={errors}
          />
        </div>
        <div>
          <InputRequired
            label="Age"
            type="number"
            register={register}
            name={"age"}
            validation={{ min: 10, max: 99 }}
            errors={errors}
          />
        </div>
        <div>
          <InputRequired
            label="Major"
            register={register}
            name={"major"}
            validation={{ pattern: /^[A-Za-z]+$/i }}
            errors={errors}
          />
        </div>
        <Button
          type="submit"
          className="mt-5 cursor-pointer"
          color="primary"
          ariaLabel={"Create"}
        >
          Create
        </Button>
      </form>
    </Popup>
  );
};

export default UserCreationPopup;
