export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
export interface IUserAuth {
  email: string;
  password: string;
  name?: string;
  major?: string;
  age?: string;
}
export interface IUser {
  email: string;
  _id?: string;
  isActive?: string;
}

export interface IProfile extends Pick<IUser, 'email'> {}

export interface IResetPassword {
  id: string;
  token: string;
  password: string;
}

export interface IResetPass {
  password: string;
  'repeat-password': string;
}


