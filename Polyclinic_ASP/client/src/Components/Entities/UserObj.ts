interface UserObj {
  username: string;
  email: string;
  doctorId?: number;
  roles: Array<string>;
  isAuthenticated: boolean;
}

export default UserObj;
