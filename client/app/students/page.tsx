"use server";
import React from "react";
import { getAllStudents } from "@/services/students.service";
import StudentsPage from "../../pages/students/StudentsPage";

const Students = async ({
  searchParams,
}: {
  searchParams?: {
    searchQuery?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.searchQuery || "";
  const data = await getAllStudents(query);
  return <StudentsPage students={data} />;
};

export default Students;
