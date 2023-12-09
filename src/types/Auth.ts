import { User } from "./User";

export interface LoginPayload {
    email: string
    password: string
  }
  
  export interface LoginResponse {
    accessToken: string
  }

  export interface AuthReducerState {
      auth: LoginPayload[]
      allUserData: User[]
      user: User | null
      loading: boolean
      error?: string | null | undefined
      access_Token: string | null
    }
  