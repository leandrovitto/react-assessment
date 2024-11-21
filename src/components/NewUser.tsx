import React, { useState } from "react";
import { User } from "../models";
import ListFriends from "./ListFriends";
import AddFriends from "./AddFriends";

const NewUser = ({
  onClose,
  onSave,
  onNewUser,
  users,
  userToEdit,
}: {
  onClose: (user: User) => void;
  onNewUser: () => void;
  onSave: (user: User) => void;
  users: User[];
  userToEdit: User | null;
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
        <AddFriends
          userToEdit={user}
          listUsers={users}
          onChange={(friends) => {
            setUser({ ...user, friends });
          }}
        />

        <ListFriends
          onRemoveFriend={(id: number) => {
            setUser({
              ...user,
              friends: user.friends.filter((f) => f !== id),
            });
          }}
          userFriends={user.friends}
          listUsers={users}
        />
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
