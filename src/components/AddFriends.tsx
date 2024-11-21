import { User } from "../models";
import { useUsersContext } from "./UsersContext";

const AddFriends = ({ userToEdit }: { userToEdit: User }) => {
  const { getUsersWithoutMe, addFriend } = useUsersContext();

  const handleAddFriend = (friendId: number) => {
    addFriend(userToEdit.id, friendId);
  };

  const getListFriendWithoutSelected = () => {
    return getUsersWithoutMe(userToEdit.id).filter(
      (f) => !userToEdit.friends.includes(f.id)
    );
  };

  return (
    <div>
      <div>
        <select
          onChange={(e) => {
            handleAddFriend(+e.target.value);
          }}
          disabled={
            userToEdit.friends.length == getUsersWithoutMe(userToEdit.id).length
          }
        >
          <option value="">Select Friend</option>
          {getListFriendWithoutSelected().map((friend) => (
            <option key={friend.id} value={friend.id}>
              {friend.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AddFriends;
