import { createContext, useContext } from "react";
import { User } from "../models";

interface UsersContextType {
  addUser: (user: User) => void;
  deleteUser: (id: number) => void;
  editUser: (id: number, payload: User) => void;
  getFriends: (friends: number[]) => User[];
  getUsers: () => User[];
  getUser: (id: number) => User | null;
  getUsersWithoutMe: (id: number) => User[];
}

const UsersContext = createContext<UsersContextType | null>(null);

const useUsersContext = () => {
  const usersContext = useContext(UsersContext);
  if (!usersContext) {
    throw new Error("useUsersContext must be used within a UsersProvider");
  }
  return usersContext;
};

export { UsersContext, useUsersContext };
