import { useState } from "react";
import { User } from "../models";
import AddFriends from "./AddFriends";
import ListFriends from "./ListFriends";

const NewUser = ({
  onClose,
  onSave,
  onNewUser,
  userToEdit,
}: {
  onClose: (user: User) => void;
  onNewUser: () => void;
  onSave: (user: User) => void;
  userToEdit: User | undefined;
}) => {
  const [user, setUser] = useState<User>(
    userToEdit || {
      id: 0,
      name: "",
      friends: [],
    }
  );

  const handleSave = () => {
    if (user.name === "") {
      alert("Name is required");
      return;
    }
    onSave(user);
  };

  const handleClose = () => {
    onClose(user);
  };

  if (!userToEdit) {
    return <div>User not Found!</div>;
  }

  return (
    <div style={{ padding: "10px" }}>
      {userToEdit?.name ? <h5>Edit User</h5> : <h5>New User</h5>}
      <br></br>
      <label>Name:{user?.name}</label>
      <input
        type="text"
        placeholder="Name"
        value={user?.name}
        onChange={(e) => {
          setUser({ ...user, name: e.target.value });
        }}
      />
      <br></br>

      <hr></hr>
      <p>Friends</p>
      <div>
        <button onClick={onNewUser}>Add New Friend</button>
        <AddFriends userToEdit={user} />
        <ListFriends userToEdit={user} />
      </div>

      <hr></hr>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <button onClick={handleClose}>Close</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default NewUser;
