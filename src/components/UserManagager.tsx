import { useState } from "react";
import { User } from "../models";
import ListUsers from "./ListUsers";
import { useUsersContext } from "./UsersContext";
import Modal from "./modal/Modal";
import NewUser from "./NewUser";

const UserManagager = () => {
  const idNewUser = -1;
  const [operations, addOperations] = useState<number[]>([]);
  const { getUser, addUser, editUser } = useUsersContext();

  const businessLockLogic = (index: number, ops: number[]) => {
    if (index < ops.length - 1) {
      console.log("Chiudi le altre");
      return false;
    }
    return true;
  };

  const handleSaveOrEditElement = (user: User) => {
    const userToEdit = getUser(user.id);
    if (userToEdit) {
      editUser(user.id, user);
    } else {
      addUser({ ...user, id: generateId() });
    }
  };

  const handleCloseElement = () => {
    operations.pop();
    addOperations([...operations]);
  };

  const generateId = () => {
    const id = Math.floor(Math.random() * 1000);
    if (getUser(id)) {
      return generateId();
    }
    return id;
  };

  const handleNewOperation = () => {
    handleOpen(idNewUser);
  };

  const handleOpen = (userId: number) => {
    addOperations([...operations, userId]);
  };

  return (
    <div>
      {/*       {JSON.stringify(getUsers(), undefined, 2)}
      <hr></hr>
      {JSON.stringify(operations, undefined, 2)} */}
      <h5>List Users</h5>

      <button
        onClick={handleNewOperation}
        disabled={operations.some((i) => i == idNewUser)}
      >
        New User
      </button>

      {operations.map((operationId, index) => (
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
                operationId === idNewUser
                  ? {
                      id: operationId,
                      name: "",
                      friends: [],
                    }
                  : getUser(operationId)
              }
            />
          </Modal>
        </div>
      ))}

      <ListUsers onOpen={handleOpen} />
    </div>
  );
};

export default UserManagager;
