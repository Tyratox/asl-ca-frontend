export type Maybe<T> = T | null;

export interface Certificate {
  id: number;
  name: string;
  createdAt: number;
  blob: string;
  revoked: boolean;
  username: string;
}

export interface User {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  isAdministrator: boolean;
}

export interface ErrorResponse {
  error: string;
}
