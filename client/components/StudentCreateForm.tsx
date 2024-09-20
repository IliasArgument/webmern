"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import { useQueryClient, useMutation } from "react-query";
import { createStudent } from "../services/students.service";

const StudentCreateForm = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const createStudentData = () => ({
    name: "Burrito Sak",
    age: 21,
    major: "Analyst",
  });

  const create = () => {
    mutate.mutate(createStudentData());
  };
  return (
    <>
    <Button
      color="warning"
      onClick={create}
      className="flex text-white p-2 ml-auto"
    >
      Create
    </Button>
    </>
  );
};

export default StudentCreateForm;
