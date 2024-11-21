import { useState } from "react";
import { User } from "../models";
import ListUsers from "./ListUsers";
import Modal from "./modal/Modal";
import NewUser from "./NewUser";

const UserManagager = () => {
  const [operations, addOperations] = useState<number[]>([]);

  const [users, setUsers] = useState<User[]>([
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
  ]);

  const findUserById = (id: number) => {
    return users.find((user) => user.id === id);
  };

  const findUserIndexById = (id: number) => {
    return users.findIndex((user) => user.id === id);
  };

  const businessLockLogic = (index: number, ops: number[]) => {
    if (index < ops.length - 1) {
      console.log("Chiudi le altre");
      return false;
    }
    return true;
  };

  const handleSaveElement = (user: User) => {
    users.push(user);
    setUsers([...users]);
  };

  const handleEditElement = (user: User) => {
    const index = findUserIndexById(user.id);
    users[index] = user;
    setUsers([...users]);
  };

  const handleSaveOrEditElement = (user: User) => {
    const userToEdit = findUserById(user.id);
    if (userToEdit) {
      handleEditElement(user);
    } else {
      handleSaveElement(user);
    }
  };

  const handleCloseElement = () => {
    operations.pop();
    addOperations([...operations]);
  };

  const generateId = () => {
    const id = Math.floor(Math.random() * 1000);
    if (findUserById(id)) {
      return generateId();
    }
    return id;
  };

  const handleNewOperation = () => {
    handleOpen(generateId());
  };

  const handleOpen = (id: number) => {
    addOperations([...operations, id]);
  };

  return (
    <div>
      {JSON.stringify(operations)}
      <h5>List Users</h5>

      <button onClick={handleNewOperation}>New User</button>

      {operations.map((operation, index) => (
        <div key={index}>
          <Modal
            openModal={true}
            style={{
              marginLeft: `${index * 25}px`,
              marginTop: `${index * 25}px`,
            }}
          >
            <NewUser
              onNewUser={() => handleNewOperation()}
              onSave={(user: User) => {
                if (businessLockLogic(index, operations)) {
                  handleSaveOrEditElement(user);
                  handleCloseElement();
                }
              }}
              onClose={() => {
                if (businessLockLogic(index, operations)) {
                  handleCloseElement();
                }
              }}
              userToEdit={
                findUserById(operation) || {
                  id: operation,
                  name: "",
                  friends: [],
                }
              }
              users={users}
            />
          </Modal>
        </div>
      ))}

      <ListUsers users={users} onOpen={handleOpen} />
    </div>
  );
};

export default UserManagager;
