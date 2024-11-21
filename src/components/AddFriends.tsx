import { User } from "../models";

const AddFriends = ({
  onChange,
  userToEdit,
  listUsers,
}: {
  onChange: (friends: number[]) => void;
  listUsers: User[];
  userToEdit: User;
}) => {
  const handleAddFriend = (id: number) => {
    onChange([...userToEdit.friends, id]);
  };

  const getListFriendsWithoutMe = () => {
    return listUsers.filter((f) => f.id !== userToEdit.id);
  };

  const getListFriendWithoutSelected = () => {
    return getListFriendsWithoutMe().filter(
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
            userToEdit.friends.length == getListFriendsWithoutMe().length
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
