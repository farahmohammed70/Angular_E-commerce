export interface User {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
  password?: string;
  role?: string;
  token?: string;
  active?: boolean;
  createdAt?: Date;
}
