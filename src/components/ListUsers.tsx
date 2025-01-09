import { X } from "lucide-react";
import { User } from "../models";
import { Card } from "./ui/card";
import { useUsersContext } from "./UsersContext";

const ListUsers = ({ onOpen }: { onOpen: (id: number) => void }) => {
  const { getUsers, getFriends, deleteUser } = useUsersContext();

  const handleDelete = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    user: User
  ) => {
    e.stopPropagation();
    deleteUser(user?.id);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 my-2 max-w-xl mx-auto">
        {getUsers().map((user, index) => (
          <Card key={index} onClick={() => onOpen(user.id)} className="p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-md font-bold">{user.name}</p>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => handleDelete(e, user)}
              >
                <X size={16} />
              </div>
            </div>
            {user.friends.length > 0 && (
              <div>
                <div className="font-bold">Friends: {user.friends.length}</div>
                <ul className="grid grid-cols-2 gap-4 my-2">
                  {getFriends(user.friends).map((f, idx) => (
                    <li
                      className="flex justify-between border p-2 rounded-md"
                      key={idx}
                    >
                      {f.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListUsers;
