export interface User {
  _id: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  password: string;
}

export interface UsersReducerState {
  users: User[];
  loading: boolean;
  error?: string;
}
