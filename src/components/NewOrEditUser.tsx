import { useEffect, useState } from "react";
import { User } from "../models";
import AddFriends from "./AddFriends";
import ListFriends from "./ListFriends";
import { useUsersContext } from "./UsersContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";

export const idNewUser = -1;

const maxRetry = 1;
const randomFailure = () => Math.random() < 0.5;

const NewOrEditUser = ({
  onClose,
  onNewUser,
  userId,
  locked,
}: {
  onNewUser: () => void;
  onClose: () => void;
  userId: number;
  locked: boolean;
}) => {
  const { getUser, addUser, editUser } = useUsersContext();

  const [errors, setErrors] = useState<{ key: string; message: string }[]>([]);
  const [alert, setAlert] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);

  const [user, setUser] = useState<User>({
    id: idNewUser,
    name: "",
    friends: [],
  });

  useEffect(() => {
    const u = getUser(userId);
    if (u) {
      setUser(u);
    }
  }, [userId]);

  const checkForm = () => {
    setErrors([]);
    if (user.name === "") {
      setErrors([...errors, { key: "name", message: "Name is required" }]);
      return false;
    }
    return true;
  };

  const handleSaveOrEditElement = () => {
    if (checkForm() && !locked) {
      setAlert(null);

      try {
        let success = !randomFailure();
        console.log("retry: " + retry);

        if (!success) {
          if (retry == maxRetry) {
            throw new Error(
              `Failed to save user (${retry})  - please try again later`
            );
          } else {
            setRetry(retry + 1);
            return;
          }
        } else {
          const u = getUser(user.id);

          if (u) {
            editUser(user.id, user);
          } else {
            addUser({ ...user, id: generateId() });
          }
          onClose();
        }
      } catch (error: any) {
        setRetry(0);
        setAlert(error.message);
        return;
      }
    }
  };

  useEffect(() => {
    if (retry > 0 && retry <= maxRetry) {
      handleSaveOrEditElement();
    }
  }, [retry]);

  const handleAddFriend = (friendId: number) => {
    setUser({ ...user, friends: [...user.friends, friendId] });
  };

  const handleRemoveFriend = (friendId: number) => {
    setUser({
      ...user,
      friends: [...user.friends.filter((friend) => friend !== friendId)],
    });
  };

  const generateId = () => {
    const id = Math.floor(Math.random() * 1000);
    if (getUser(id)) {
      return generateId();
    }
    return id;
  };

  const handleClose = () => {
    console.log("handleClose");
    if (!locked) {
      onClose();
    }
  };

  if (!user) {
    return <div>User not Found!</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-xl font-bold">
        {user?.name ? <h5>Edit User</h5> : <h5>New User</h5>}
      </div>

      <Input
        type="text"
        placeholder="Name"
        value={user?.name}
        onChange={(e) => {
          setUser({ ...user, name: e.target.value });
        }}
        className={
          errors.find((error) => error.key === "name") ? "border-red-500" : ""
        }
      />
      {errors.find((error) => error.key === "name") && (
        <p className="text-red-500 text-sm">Name is required</p>
      )}
      <div className="text-md font-bold">Friends</div>
      <div className="flex justify-between">
        <Button onClick={onNewUser}>Add New Friend</Button>
        <p>or</p>
        <AddFriends userToEdit={user} onAddFriend={handleAddFriend} />
      </div>
      <ListFriends userToEdit={user} onRemoveFriend={handleRemoveFriend} />

      {alert && (
        <Alert variant={"destructive"}>
          <AlertDescription>{alert}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-4 justify-between">
        <Button variant={"outline"} onClick={handleClose}>
          Close
        </Button>
        <Button onClick={handleSaveOrEditElement}>Save</Button>
      </div>
    </div>
  );
};

export default NewOrEditUser;
