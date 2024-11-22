import { X } from "lucide-react";
import { User } from "../models";
import { useUsersContext } from "./UsersContext";

const ListFriends = ({
  userToEdit,
  onRemoveFriend,
}: {
  userToEdit: User;
  onRemoveFriend: (friendId: number) => void;
}) => {
  const { getFriends } = useUsersContext();

  const handleRemoveFriend = (friendId: number) => {
    onRemoveFriend(friendId);
  };

  return (
    <div>
      <ul className="grid grid-cols-2 gap-4">
        {getFriends(userToEdit?.friends).map((user, key) => (
          <li key={key} className="flex justify-between border p-2 rounded-md">
            <p className="text-sm">
              {key + 1}){` `}
              {user?.name}
            </p>
            <div
              className="cursor-pointer"
              onClick={() => handleRemoveFriend(user?.id)}
            >
              <X size={16} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListFriends;
