import { User } from "../models";
import { useUsersContext } from "./UsersContext";

const ListFriends = ({ userToEdit }: { userToEdit: User }) => {
  const { getFriends, removeFriend } = useUsersContext();

  const handleRemoveFriend = (friendId: number) => {
    removeFriend(userToEdit.id, friendId);
  };

  return (
    <div>
      <ul>
        {getFriends(userToEdit?.id).map((user, key) => (
          <li key={key} className="friendItem">
            {user?.name}
            <div onClick={() => handleRemoveFriend(user?.id)}>X</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListFriends;
