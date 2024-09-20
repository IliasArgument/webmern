"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IStudent } from "../types/Students";
import { ButtonEdit, ButtonRemove } from "./ui/buttons";
import { Input } from "./ui/forms";
import Image from "next/image";
import Button from "./ui/buttons/Button";
import Link from "next/link";
import { updateStudent } from "../services/students.service";
import { useMutation, useQueryClient } from "react-query";

export default function StudentCard({ student }: { student: IStudent }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [formData, setFormData] = useState({
    age: student.age,
    major: student.major,
    name: student.name,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setTimeout(() => setIsEdit(false), 1000);
    },
  });

  useEffect(() => {
    // Проверяем, отличаются ли значения formData от начальных данных student
    const isDataChanged =
      +formData.age !== student.age ||
      formData.major !== student.major ||
      formData.name !== student.name;
    // Обновляем состояние isDisabled в зависимости от того, изменились ли данные
    setIsDisabled(!isDataChanged);
  }, [formData, student]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggle = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    setIsEdit(!isEdit);
  };

  const handleFocus = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const updateStudentData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    mutation.mutate({ data: formData, id: student._id! });
  };

  return (
    <div className="relative flex flex-row justify-between  p-0 w-full h-full border rounded-xl card-shadow">
      <div className="h-full flex">
        <Image
          alt="Card background"
          className="flex object-cover rounded-bl-lg	rounded-tl-lg	 border-right w-[8rem] h-full z-10 "
          src="/hero-card-complete-1.jpg"
          width={128}
          height={200}
        />
      </div>
      <div className="flex justify-between flex-col w-full">
        <div className="w-full flex justify-around gap-1 items-start">
          <div className="flex justify-between  items-center gap-2 h-[40px]">
            {isEdit ? (
              <Input
                placeholder="Name"
                name={"name"}
                style={{ padding: ".2rem" }}
                value={formData.name}
                onChange={handleChange}
                onClick={handleFocus}
              />
            ) : (
              <p className="flex items-center text-tiny uppercase font-bold mb-0 h-[41.3px]">
                {student?.name}
              </p>
            )}
          </div>
          <div className="flex  justify-center items-center gap-2 h-[41.3px]">
            {isEdit ? (
              <Input
                placeholder="Major"
                name={"major"}
                style={{ padding: ".2rem" }}
                value={formData.major}
                onChange={handleChange}
                onClick={handleFocus}
              />
            ) : (
              <p className="flex items-center text-tiny uppercase font-bold">
                {student?.major}
              </p>
            )}
          </div>
          <div className="flex justify-center items-center gap-2 h-[41.3px]">
            {isEdit ? (
              <Input
                placeholder="Age"
                type="number"
                name={"age"}
                style={{ padding: ".2rem" }}
                value={formData.age}
                onChange={handleChange}
                onClick={handleFocus}
              />
            ) : (
              <p className="flex items-center text-tiny uppercase font-bold">
                {student?.age}
              </p>
            )}
          </div>
        </div>
        <div>
          <Link
            href={`/students/${student?._id}`}
            className="text-blue-800 ml-3	flex"
          >
            More info ...
          </Link>
        </div>
      </div>
      {/* </CardBody> */}
      <div className="flex flex-col justify-center gap-2 p-3">
        <ButtonEdit id={student._id} toggle={toggle} />
        {!isEdit ? (
          <ButtonRemove id={student._id} />
        ) : (
          <Button
            color="secondary"
            text="Save"
            ariaLabel={"Save change"}
            disabled={isDisabled}
            onClick={updateStudentData}
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
}
