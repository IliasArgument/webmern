"use server";
import { IStudent, IStudentData } from "../types/Students";
import { redirect } from "next/navigation";
import $api from "@/http";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
  next: {
    revalidate: 10, // Revalidate every hour
    cache: "no-store",
  },
};

//create student
export async function createStudent(data: IStudent) {
  try {
    const response = await $api.post(`/students/create`, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

//update data
export async function updateStudent({
  data,
  id,
}: {
  data: IStudent;
  id: string;
}) {
  try {
    const response = await $api.put(`/students/update/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

//get all students
export const getAllStudents = async (
  searchQuery = ""
): Promise<IStudentData | undefined> => {
  try {
    const response = await $api.get(
      `/students?searchQuery=${searchQuery}`,
      options
    );
    const students = response?.data?.data ?? [];
    return students;
    // Обработка полученных данных
  } catch (error) {
    console.error("Error searching students:", error);
  }
};

//get student by id
export async function getStudentById(id: string) {
  try {
    const response = await $api.get(`/students/${id}`, options);
    const student = response?.data;
    return student;
  } catch (error: any) {
    throw error; // Прокидываем ошибку дальше для обработки в другом месте
  }
}

//delete student by id
export async function removeStudentBtId(id: string) {
  try {
    const response = await $api.delete(`/students/remove/${id}`);
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
