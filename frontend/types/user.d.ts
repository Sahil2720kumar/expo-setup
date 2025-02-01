export interface User {
  id: number;
  name: string;
  email: string;
  profileImg: string;
  bio: string;
  role: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  addresses: Address[];
}

export interface Address {
  id: number;
  userId: number;
  street: string;
  city: string;
  state: string;
  zip: string;
}