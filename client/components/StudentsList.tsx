"use client";
import { IStudent } from "../types/Students";
import { getAllStudents } from "../services/students.service";
import Link from "next/link";
import { useQuery } from "react-query";
import StudentCard from "./StudentCard";
import SearchField from "./ui/forms/SearchField";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Students({ data }: { data?: IStudent[] }) {
  const searchParams = useSearchParams();

  const search: any = searchParams?.get("searchQuery");
  const {
    data: students,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["students", search ? search : ""],
    queryFn: () => getAllStudents(search ? search : ""),
    initialData: data,
    refetchOnMount: false,
  });

  const isEmpty = !students?.length;
  // usequery lib

  return (
    <div className="w-full lg:w-4/6 h-full relative">
      <SearchField />

      {isError && (
        <h3 className="text-center text-pink-900 mt-4">OOh Error...</h3>
      )}
      {isEmpty || isLoading ? (
        <h3 className="text-center text-pink-900 mt-4">Empty...</h3>
      ) : (

        <ul className="student-list bg-white text-slate-600 flex gap-3 flex-col w-full rounded-lg">
          {students &&
            students?.map((student: IStudent) => (
              <li className="flex w-full h-[110px]" key={student._id}>
                <StudentCard student={student} />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
