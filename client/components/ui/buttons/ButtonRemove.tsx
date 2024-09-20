"use client";
import React from "react";
import {
  removeStudentBtId,
} from "../../../services/students.service";
import { useMutation, useQueryClient } from "react-query";
import Button from "./Button";

const ButtonRemove = ({ id }: any) => {

  const queryClient = useQueryClient();

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('hello')
    if (window.confirm("Удалить студента?")) {
      mutation.mutate(id); // Запускаем мутацию
    }
  };

  const mutation = useMutation({
    mutationFn: () => removeStudentBtId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
  return (
    <Button
      color="danger"
      onClick={handleRemove}
      aria-label="Удалить студента"
      text="Remove"
      ariaLabel={""}
    >
      Remove
    </Button>
  );
};

export default ButtonRemove;
