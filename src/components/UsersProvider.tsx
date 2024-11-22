import { useState } from "react";
import { User } from "../models";
import { UsersContext } from "./UsersContext";

interface UsersProviderProps {
  children: React.ReactNode;
}

const initStateUsers = [
  {
    id: 1,
    name: "John",
    friends: [2, 3],
  },
  {
    id: 2,
    name: "Doe",
    friends: [1, 3],
  },
  {
    id: 3,
    name: "Alice",
    friends: [1, 2],
  },
];

const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initStateUsers || []);

  const getUserIndexById = (id: number) => {
    return users.findIndex((user) => user.id === id);
  };

  const getUsers = (): User[] => {
    return users;
  };

  const getUsersWithoutMe = (id: number) => {
    return users.filter((user) => user.id !== id);
  };

  const addUser = (user: User) => {
    setUsers([...users, user]);
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const editUser = (id: number, payload: User) => {
    const index = getUserIndexById(id);
    users[index] = payload;
    setUsers([...users]);
  };

  const getUser = (id: number) => {
    const u = users.find((user) => user.id === id);
    if (!u) {
      return null;
    }
    return u;
  };

  const getFriends = (friends: number[]) => {
    const out: User[] = [];
    if (friends) {
      friends.forEach((id) => {
        try {
          const u = getUser(id);
          if (u) {
            out.push(u);
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
    return out;
  };

  return (
    <UsersContext.Provider
      value={{
        addUser,
        deleteUser,
        editUser,
        getFriends,
        getUsers,
        getUser,
        getUsersWithoutMe,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
