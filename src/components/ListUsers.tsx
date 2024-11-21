import { User } from "../models";

const ListUsers = ({
  users,
  onOpen,
}: {
  users: User[];
  onOpen: (id: number) => void;
}) => {
  return (
    <div>
      <ul>
        {users.map((user, index) => (
          <li key={index} onClick={() => onOpen(user.id)}>
            {user.name} | Friends: {user.friends.length}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;
