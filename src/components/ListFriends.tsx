import { User } from "../models";

const ListFriends = ({
  onRemoveFriend,
  userFriends,
  listUsers,
}: {
  onRemoveFriend: (id: number) => void;
  userFriends: number[];
  listUsers: User[];
}) => {
  const getUser = (id: number) => {
    return listUsers.find((u) => u.id === id);
  };

  return (
    <div>
      <ul>
        {userFriends.map((id, key) => (
          <li key={key} className="friendItem">
            {getUser(id)?.name}
            <div onClick={() => onRemoveFriend(id)}>X</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListFriends;
