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

  const addFriend = (id: number, friendId: number) => {
    const index = getUserIndexById(id);
    users[index].friends.push(friendId);
    setUsers([...users]);
  };

  const removeFriend = (id: number, friendId: number) => {
    const index = getUserIndexById(id);
    users[index].friends = users[index].friends.filter(
      (friend) => friend !== friendId
    );
    setUsers([...users]);
  };

  const getFriends = (id: number) => {
    const friends: User[] = [];
    const user = getUser(id);
    if (user && user.friends) {
      user.friends.forEach((id) => {
        try {
          const u = getUser(id);
          if (u) {
            friends.push(u);
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
    return friends;
  };

  return (
    <UsersContext.Provider
      value={{
        addUser,
        deleteUser,
        editUser,
        addFriend,
        removeFriend,
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
