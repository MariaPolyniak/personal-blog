import { User } from "../user-account/user.model";

export interface SignUpRequest {
  firstName: string,
  lastName: string,
  login: string,
  password: string,
  avatar?: File
}

export interface SignInRequest {
  login: string,
  password: string
}

export interface AuthResponse {
  token: string;
  user: User;
}
