import { User } from "../models";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useUsersContext } from "./UsersContext";

const AddFriends = ({
  userToEdit,
  onAddFriend,
}: {
  userToEdit: User;
  onAddFriend: (friendId: number) => void;
}) => {
  const { getUsersWithoutMe } = useUsersContext();

  const handleAddFriend = (friendId: number) => {
    onAddFriend(friendId);
  };

  const getListFriendWithoutSelected = () => {
    return getUsersWithoutMe(userToEdit.id).filter(
      (f) => !userToEdit.friends.includes(f.id)
    );
  };

  return (
    <Select
      onValueChange={(value) => {
        handleAddFriend(parseInt(value));
      }}
      disabled={
        userToEdit.friends.length == getUsersWithoutMe(userToEdit.id).length
      }
      value=""
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Friend" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {getListFriendWithoutSelected().map((friend) => (
            <SelectItem key={friend.id} value={friend.id.toString()}>
              {friend.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AddFriends;
