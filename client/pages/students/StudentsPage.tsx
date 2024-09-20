"use client";
import StudentsList from "@/components/StudentsList";
import { UserCreationPopup } from "@/components/ui/popups";
import { IStudentData } from "@/types/Students";
import React, { FC } from "react";

const StudentsPage: FC<IStudentData> = ({ students }) => {
  return (
    <section className="flex min-h-screen flex-col items-center pt-20 px-2 sm:px-5">
      <h2 className="text-2xl sm:text-3xl lg:text-5xl text-black block">Students</h2>
      <div className="flex justify-between items-center ml-auto pb-3">
        <UserCreationPopup />
      </div>
      <StudentsList data={students} />
    </section>
  );
};

export default StudentsPage;
