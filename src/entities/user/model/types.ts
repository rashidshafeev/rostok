export interface User {
  name: string;
  photo: string | null;
  phone: string;
  email: string;
  gender: string;
  date_of_birth: string | null;
}

export interface UserState {
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  data: User | null;
}
