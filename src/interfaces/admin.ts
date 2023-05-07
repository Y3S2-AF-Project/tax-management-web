export interface ILogin {
  email: string;
  password: string;
}

export interface IAdmin {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  permissions: string[];
  addedBy: string;
  lastUpdatedBy: string;
  isActive: string;
  isDeleted: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}
