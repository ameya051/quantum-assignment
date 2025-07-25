export interface AuthResponse {
  success?: boolean;
  message?: string;
  error?: string;
  data?: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      dob?: string;
      createdAt?: string;
    };
  }
}

export interface LocaleStorageAuthData {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    dob?: string;
    createdAt?: string;
  };
}