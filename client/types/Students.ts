export interface IStudent {
  _id?: string;
  name: string;
  age: number;
  major: string;
}

export interface IStudentData {
  students: IStudent[]
}