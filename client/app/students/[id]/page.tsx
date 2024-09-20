
import { getStudentById } from "@/services/students.service";
import ButtonRemove from "@/components/ui/buttons/ButtonRemove";
import React from "react";
import { useSearchParams } from "next/navigation";

const Student = async ({ params: { id } }: { params: { id: string } }) => {
  const student = await getStudentById(id);

  return (
    <div className="min-w-full min-h-full p-8">
      <div className="w-full h-full flex justify-center items-center flex-col">
        <h2 className="p-10 mt-5 text-2xl text-slate-600">
          Student ID: <b className="text-slate-300">{id}</b>
        </h2>
        <div className="w-2/3  flex justify-between items-center">
          <p className="flex items-center">
            Name:{" "}
            <span className="text-zinc-400  text-3xl font-bold">
              {student.name}
            </span>
          </p>
          <ButtonRemove id={id} />
        </div>
      </div>
    </div>
  );
};

export default Student;
