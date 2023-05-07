export interface IEmployee {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  role: string;
  permissions: string[];
  addedBy: string;
  lastUpdatedBy: string;
  isActive: string;
  isFirstLogin: string;
  isDeleted: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}
